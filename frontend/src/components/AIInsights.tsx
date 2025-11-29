import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';
import { fetchAIInsights } from '@/lib/api';

export function AIInsights() {
    const [insights, setInsights] = useState<string>('Analyzing network patterns...');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadInsights = async () => {
            try {
                const data = await fetchAIInsights();
                setInsights(data.insights);
            } catch (error) {
                setInsights('Unable to generate insights at this time.');
            } finally {
                setIsLoading(false);
            }
        };

        loadInsights();
    }, []);

    return (
        <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg font-medium">AI Network Insights</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {isLoading ? (
                        <div className="animate-pulse space-y-2">
                            <div className="h-4 bg-primary/10 rounded w-3/4"></div>
                            <div className="h-4 bg-primary/10 rounded w-1/2"></div>
                        </div>
                    ) : (
                        insights
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
