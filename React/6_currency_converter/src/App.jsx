import { useState } from "react";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import InputBox from "./components/InputBox";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("PKR");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [isConverting, setIsConverting] = useState(false);
  const [hasConverted, setHasConverted] = useState(false);

  const { data: currencyInfo, loading } = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo).sort();

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
    setHasConverted(false);
  };

  const convert = () => {
    if (currencyInfo && currencyInfo[to?.toUpperCase()]) {
      setIsConverting(true);
      setTimeout(() => {
        setConvertedAmount(+(amount * currencyInfo[to?.toUpperCase()]).toFixed(4));
        setIsConverting(false);
        setHasConverted(true);
      }, 400);
    }
  };

  const rate = currencyInfo[to?.toUpperCase()];

  return (
    <>
      <div className="grid-bg" />

      <div className="app-root" style={{ position: "relative", zIndex: 1 }}>
        <div className="card">
          {/* Header */}
          <div style={{ marginBottom: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
              <h1 style={{
                fontSize: "22px",
                fontWeight: "800",
                color: "#ffffff",
                letterSpacing: "-0.02em",
              }}>
                FX Convert
              </h1>
              <div className="rate-badge">
                <span className="dot" />
                {loading ? "Loading…" : "Live rates"}
              </div>
            </div>
            <p style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.3)",
              fontFamily: "'Space Mono', monospace",
              letterSpacing: "0.05em",
            }}>
              Real-time foreign exchange
            </p>
          </div>

          {/* Rate preview */}
          {rate && !loading && (
            <div style={{
              marginBottom: "24px",
              padding: "12px 16px",
              background: "rgba(255,215,0,0.04)",
              borderRadius: "8px",
              border: "1px solid rgba(255,215,0,0.08)",
            }}>
              <span style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "12px",
                color: "rgba(255,255,255,0.4)",
              }}>
                1 {from} ={" "}
                <span style={{ color: "#FFD700", fontWeight: "700" }}>
                  {rate.toFixed(4)}
                </span>{" "}
                {to}
              </span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); convert(); }}>
            <div style={{ marginBottom: "8px" }}>
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(c) => { setFrom(c); setHasConverted(false); }}
                selectCurrency={from}
                onAmountChange={(a) => { setAmount(a); setHasConverted(false); }}
              />
            </div>

            {/* Swap row */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "12px 0",
            }}>
              <button type="button" className="swap-btn" onClick={swap} title="Swap currencies">
                ⇅
              </button>
            </div>

            <div style={{ marginBottom: "28px" }}>
              <InputBox
                label="To"
                amount={hasConverted ? convertedAmount : ""}
                currencyOptions={options}
                onCurrencyChange={(c) => { setTo(c); setHasConverted(false); }}
                selectCurrency={to}
                amountDisable
              />
            </div>

            <button
              type="submit"
              className="convert-btn"
              disabled={loading || isConverting}
            >
              {isConverting ? "Converting…" : `Convert ${from} → ${to}`}
            </button>
          </form>

          {/* Result callout */}
          {hasConverted && (
            <div className="shimmer" style={{
              marginTop: "20px",
              padding: "16px 20px",
              background: "rgba(34,197,94,0.06)",
              border: "1px solid rgba(34,197,94,0.15)",
              borderRadius: "12px",
              textAlign: "center",
            }}>
              <p style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "11px",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}>Result</p>
              <p style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: "20px",
                color: "#22c55e",
                fontWeight: "700",
                letterSpacing: "-0.01em",
              }}>
                {amount.toLocaleString()} {from} = {convertedAmount.toLocaleString()} {to}
              </p>
            </div>
          )}

          {/* Footer */}
          <p style={{
            marginTop: "24px",
            textAlign: "center",
            fontSize: "10px",
            color: "rgba(255,255,255,0.2)",
            fontFamily: "'Space Mono', monospace",
            letterSpacing: "0.08em",
          }}>
            POWERED BY BUDJET.ORG — RATES FOR REFERENCE ONLY
          </p>
        </div>
      </div>
    </>
  );
}