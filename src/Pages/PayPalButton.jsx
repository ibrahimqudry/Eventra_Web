import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Box, Typography } from "@mui/material";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  const initialOptions = {
    clientId:
      "AYkUoAt4-4SmIUd4BXcfNc-Io3ukAsJDPwgLU_EANdODmr40m_u7hPe0B8lV4cG5w30MXbvoIVs9P1HT",
    currency: "USD",
    intent: "capture",
  };

  // Validate amount
  if (!amount || amount <= 0) {
    return (
      <Box sx={{ textAlign: "center", p: 2 }}>
        <Typography color="error">
          Please enter a valid amount greater than $0.00
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", minHeight: 45 }}>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: Number(amount).toFixed(2),
                    currency_code: "USD",
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            try {
              const details = await actions.order.capture();
              console.log("Payment successful:", details);
              if (onSuccess) {
                onSuccess(details);
              }
            } catch (error) {
              console.error("Capture error:", error);
              if (onError) {
                onError(error);
              }
            }
          }}
          onError={(err) => {
            console.error("Payment Error:", err);
            if (onError) {
              onError(err);
            }
          }}
        />
      </PayPalScriptProvider>
    </Box>
  );
};

export default PayPalButton;
