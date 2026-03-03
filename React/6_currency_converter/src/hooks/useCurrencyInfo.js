import { useState, useEffect } from "react";

function useCurrencyInfo(baseCurrency = "USD") {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.budjet.org/fiat/${baseCurrency}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((res) => {
        if (res.result === "success" && res.conversion_rates) {
          setData(res.conversion_rates);
        }
      })
      .catch((error) => console.error("Error fetching rates:", error))
      .finally(() => setLoading(false));
  }, [baseCurrency]);

  return { data, loading };
}

export default useCurrencyInfo;