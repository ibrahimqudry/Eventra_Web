import React from "react";
import PayPalButton from "./PayPalButton";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Divider,
  Container,
  Modal,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LockIcon from "@mui/icons-material/Lock";
import CloseIcon from "@mui/icons-material/Close";

function PaypalPaymentPage({
  cartItems = [],
  taxRate = 0.1,
  open = false,
  onClose,
}) {
  // Calculate payment details dynamically
  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateTax = (subtotal) => {
    return subtotal * taxRate;
  };

  const formatPrice = (price) => {
    return Number(price).toFixed(2);
  };

  const paymentDetails = {
    subtotal: calculateSubtotal(),
    tax: calculateTax(calculateSubtotal()),
    get total() {
      return this.subtotal + this.tax;
    },
  };

  const modalContent = (
    <Container
      maxWidth="md"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 600,
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          borderRadius: 4,
          position: "relative",
          bgcolor: "#fff",
        }}
      >
        {/* Close Button */}
        <IconButton
        
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#666",
            
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>

        <CardContent sx={{ padding: "2rem !important" }}>
          {/* Header */}
          <Box
            sx={{
              textAlign: "center",
              marginBottom: 4,
              position: "relative",
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 600,
                color: "#2c3e50",
              }}
            >
              Secure Checkout
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                color: "#34495e",
              }}
            >
              <LockIcon fontSize="small" />
              <Typography variant="body2">SSL Encrypted Payment</Typography>
            </Box>
          </Box>

          {/* Cart Items Summary */}
          {cartItems.length > 0 && (
            <Box sx={{ marginBottom: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ color: "#2c3e50" }}>
                Cart Items
              </Typography>
              {cartItems.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 1,
                    padding: "0.5rem",
                    backgroundColor: "#f8f9fa",
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2">
                    {item.name} x {item.quantity}
                  </Typography>
                  <Typography variant="body2">
                    ${formatPrice(item.price * item.quantity)}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          {/* Payment Summary */}
          <Box sx={{ marginBottom: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: "#2c3e50" }}>
              Order Summary
            </Typography>
            <Box
              sx={{
                backgroundColor: "#f8f9fa",
                padding: 2,
                borderRadius: 2,
                marginBottom: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 1,
                }}
              >
                <Typography variant="body1">Subtotal</Typography>
                <Typography variant="body1">
                  ${formatPrice(paymentDetails.subtotal)}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 1,
                }}
              >
                <Typography variant="body1">
                  Tax ({(taxRate * 100).toFixed(0)}%)
                </Typography>
                <Typography variant="body1">
                  ${formatPrice(paymentDetails.tax)}
                </Typography>
              </Box>
              <Divider sx={{ margin: "1rem 0" }} />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" sx={{ color: "#2980b9" }}>
                  ${formatPrice(paymentDetails.total)}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* PayPal Button */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              marginBottom: 3,
            }}
          >
            <Typography
              variant="body1"
              sx={{ marginBottom: 1, color: "#34495e" }}
            >
              Pay securely with PayPal
            </Typography>
            <PayPalButton 
              amount={paymentDetails.total} 
              onSuccess={(details) => {
                console.log('Payment successful:', details);
                onClose();
              }}
              onError={(err) => {
                console.error('Payment error:', err);
              }}
            />
          </Box>

          {/* Back Button */}
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={onClose}
              startIcon={<ShoppingCartIcon />}
              sx={{
                marginTop: "1rem",
                padding: "0.5rem 2rem",
                borderRadius: "8px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#f5f6f7",
                },
              }}
            >
              Return to Cart
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="payment-modal"
      aria-describedby="payment-modal-description"
      sx={{
        bgcolor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      {modalContent}
    </Modal>
  );
}

export default PaypalPaymentPage;
