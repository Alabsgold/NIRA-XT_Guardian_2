{ pkgs }: {
  deps = [
    pkgs.python311
    pkgs.nodejs-18_x
    pkgs.sqlite
    pkgs.libiconv
  ];
}
