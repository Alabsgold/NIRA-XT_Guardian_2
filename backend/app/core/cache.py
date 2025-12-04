import logging
from typing import Optional, Dict, Any

import redis

from app.core.config import settings

logger = logging.getLogger(__name__)


class ReputationCache:
    """
    Simple cache wrapper with Redis first, in-memory fallback.
    """

    def __init__(self):
        self._client = None
        self._memory_cache: Dict[str, Dict[str, Any]] = {}
        self._connect()

    def _connect(self):
        try:
            self._client = redis.Redis.from_url(settings.REDIS_URL, decode_responses=True)
            # Ping to verify connection
            self._client.ping()
            logger.info("Redis cache connected")
        except Exception as exc:  # pragma: no cover - connectivity depends on env
            logger.warning(f"Redis unavailable, using in-memory cache ({exc})")
            self._client = None

    def get(self, domain: str) -> Optional[Dict[str, Any]]:
        domain = domain.lower().rstrip(".")
        if self._client:
            try:
                data = self._client.hgetall(f"rep:{domain}")
                return data or None
            except Exception as exc:  # pragma: no cover
                logger.debug(f"Redis get failed: {exc}")
        return self._memory_cache.get(domain)

    def set(self, domain: str, data: Dict[str, Any], ttl: int = 1800) -> None:
        domain = domain.lower().rstrip(".")
        if self._client:
            try:
                self._client.hset(f"rep:{domain}", mapping=data)
                self._client.expire(f"rep:{domain}", ttl)
                return
            except Exception as exc:  # pragma: no cover
                logger.debug(f"Redis set failed: {exc}")
        self._memory_cache[domain] = data


reputation_cache = ReputationCache()
