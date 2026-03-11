import { useId } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  amountDisable = false,
  selectCurrency = "USD",
  currencyDisable = false,
}) {
  const amountInputId = useId();

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        transition: "border-color 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,215,0,0.25)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
    >
      {/* Left: label + input */}
      <div style={{ flex: 1 }}>
        <label
          htmlFor={amountInputId}
          style={{
            display: "block",
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            marginBottom: "8px",
            fontFamily: "'Space Mono', monospace",
          }}
        >
          {label}
        </label>
        <input
          id={amountInputId}
          type="number"
          placeholder="0.00"
          disabled={amountDisable}
          value={amount || ""}
          onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: amountDisable ? "rgba(255,215,0,0.85)" : "#ffffff",
            fontSize: "28px",
            fontFamily: "'Space Mono', monospace",
            fontWeight: "400",
            width: "100%",
            letterSpacing: "-0.02em",
            cursor: amountDisable ? "default" : "text",
          }}
        />
      </div>

      {/* Right: currency selector */}
      <div style={{ flexShrink: 0 }}>
        <p
          style={{
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
            marginBottom: "8px",
            fontFamily: "'Space Mono', monospace",
            textAlign: "right",
          }}
        >
          Currency
        </p>
        <select
          value={selectCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
          style={{
            background: "rgba(255,215,0,0.1)",
            border: "1px solid rgba(255,215,0,0.3)",
            borderRadius: "8px",
            color: "#FFD700",
            fontSize: "14px",
            fontFamily: "'Space Mono', monospace",
            fontWeight: "700",
            letterSpacing: "0.05em",
            padding: "8px 12px",
            cursor: currencyDisable ? "default" : "pointer",
            outline: "none",
            minWidth: "90px",
          }}
        >
          {currencyOptions.map((currency) => (
            <option
              key={currency}
              value={currency}
              style={{ background: "#0f0f14", color: "#fff" }}
            >
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;