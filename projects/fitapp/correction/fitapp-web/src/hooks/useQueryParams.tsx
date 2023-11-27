import React from "react";

function getQueryParam(name: string, defaultValue?: string | undefined) {
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.has(name)) {
    return urlParams.get(name);
  }

  return defaultValue;
}

export function useQueryParams(
  name: string,
  {
    defaultValue,
  }: {
    defaultValue?: string;
  } = {}
) {
  const [value, setParamValue] = React.useState(() =>
    getQueryParam(name, defaultValue)
  );

  const setValue = React.useCallback(
    (value: string) => {
      if (!value) {
        window.history.replaceState({}, "", window.location.pathname);
        return;
      }

      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set(name, value);
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${urlParams.toString()}`
      );

      setParamValue(value);
    },
    [name]
  );

  return [value, setValue] as const;
}
