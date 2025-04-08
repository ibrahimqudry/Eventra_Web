import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  CircularProgress,
  Alert,
  Snackbar,
  Modal,
  IconButton,
  Container,
} from "@mui/material";
import PaymentPage from "./paymentpage";
import PaypalPaymentPage from "./paypalPaymentPage";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentIcon from "@mui/icons-material/Payment";
import SecurityIcon from "@mui/icons-material/Security";
import LockIcon from "@mui/icons-material/Lock";
import CloseIcon from "@mui/icons-material/Close";

const CheckoutPage = ({ amount = 5.0 }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isPaypalModalOpen, setIsPaypalModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const handlePaymentSuccess = () => {
    setIsLoading(false);
    setSuccess(true);
    setIsCheckoutModalOpen(false);
    setIsPaymentModalOpen(false);
    setIsPaypalModalOpen(false);
  };

  const handlePaymentError = (error) => {
    setIsLoading(false);
    setError(error.message || "Payment failed. Please try again.");
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccess(false);
  };

  const handleCreditCardClick = () => {
    setIsCheckoutModalOpen(false);
    setIsPaymentModalOpen(true);
  };

  const handlePaypalClick = () => {
    setIsCheckoutModalOpen(false);
    setIsPaypalModalOpen(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Main Page Content */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
  <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem' }}>
    Review your order and proceed to payment
  </Typography>
</Box>

{/* Payment Amount Display */}
<Box
  sx={{
    backgroundColor: "#ffffff",
    p: 3,
    borderRadius: 3,
    mb: 4,
    textAlign: "center",
    maxWidth: 320,
    mx: "auto",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0 6px 25px rgba(0,0,0,0.12)",
    },
  }}
>
  <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
    Total Amount
  </Typography>
  <Typography variant="h4" sx={{ fontWeight: 700, color: "#2c3e50" }}>
    ${amount.toFixed(2)}
  </Typography>
</Box>

{/* Proceed Button */}
<Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
  <Button
    variant="contained"
    size="large"
    onClick={() => setIsCheckoutModalOpen(true)}
    sx={{
      px: 5,
      py: 1.5,
      fontSize: "1rem",
      background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
      boxShadow: "0 4px 10px rgba(33, 203, 243, 0.4)",
      borderRadius: 2,
      transition: "all 0.3s ease",
      "&:hover": {
        background: "linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)",
        transform: "translateY(-2px)",
        boxShadow: "0 6px 15px rgba(33, 203, 243, 0.5)",
      },
    }}
  >
    Proceed to Payment
  </Button>
</Box>


      {/* Payment Modal */}
      <Modal
        open={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        aria-labelledby="checkout-modal"
        aria-describedby="checkout-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 800, mx: 2 }}>
          <Card sx={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}>
            <CardContent sx={{ p: 4, position: "relative" }}>
              {/* Close Button */}
              <IconButton
                onClick={() => setIsCheckoutModalOpen(false)}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: "grey.500",
                  zIndex: 1,
                }}
              >
                <CloseIcon />
              </IconButton>

              {/* Header */}
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  Select Payment Method
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Choose your preferred payment method to complete the
                  transaction
                </Typography>
              </Box>

              {/* Payment Methods */}
              <Grid container spacing={3}>
                {/* Credit Card Option */}
                <Grid item xs={12} md={6}>
                  <Card
                    variant="outlined"
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                      transition: "all 0.3s",
                      "&:hover": {
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        transform: "translateY(-2px)",
                      },
                    }}
                    onClick={handleCreditCardClick}
                  >
                    <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
                      <CreditCardIcon
                        sx={{ fontSize: 40, color: "#2196F3", mb: 2 }}
                      />
                      <Typography variant="h6" gutterBottom>
                        Credit Card
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        Pay securely with your credit or debit card
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<CreditCardIcon />}
                        sx={{
                          background:
                            "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                          boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
                          "&:hover": {
                            background:
                              "linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)",
                          },
                        }}
                      >
                        Pay with Card
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>

                {/* PayPal Option */}
                <Grid item xs={12} md={6}>
                  <Card
                    variant="outlined"
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                      transition: "all 0.3s",
                      "&:hover": {
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        transform: "translateY(-2px)",
                      },
                    }}
                    onClick={handlePaypalClick}
                  >
                    <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
                      <PaymentIcon
                        sx={{ fontSize: 40, color: "#003087", mb: 2 }}
                      />
                      <Typography variant="h6" gutterBottom>
                        PayPal
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        Pay with your PayPal account or credit card
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<PaymentIcon />}
                        sx={{
                          background:
                            "linear-gradient(45deg, #003087 30%, #0070BA 90%)",
                          boxShadow: "0 3px 5px 2px rgba(0, 112, 186, .3)",
                          "&:hover": {
                            background:
                              "linear-gradient(45deg, #002C6D 30%, #005EA6 90%)",
                          },
                        }}
                      >
                        Pay with PayPal
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Security Badge */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: 4,
                  gap: 1,
                  color: "#666",
                }}
              >
                <SecurityIcon />
                <Typography variant="body2">Secure Payment</Typography>
                <LockIcon />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Modal>

      {/* Payment Modals */}
      <PaymentPage
        open={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        amount={amount}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />

      <PaypalPaymentPage
        open={isPaypalModalOpen}
        onClose={() => setIsPaypalModalOpen(false)}
        cartItems={[{ name: "Purchase", price: amount, quantity: 1 }]}
        taxRate={0.1}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />

      {/* Loading State */}
      {isLoading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 9999,
          }}
        >
          <CircularProgress size={60} />
        </Box>
      )}

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Payment successful!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CheckoutPage;
