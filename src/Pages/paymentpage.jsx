import React, { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Divider,
  InputAdornment,
  Alert,
  Fade,
  Modal,
  IconButton,
} from "@mui/material";
import {
  LocationOn,
  Person,
  Email,
  CreditCard,
  Lock,
  CalendarToday,
  Home,
  CheckCircle,
  Payment,
  Close as CloseIcon,
  
} from "@mui/icons-material";
import "../css/paymentpage.css";
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PaymentPage = ({ open = false, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    
    city: "",
    state: "",
    zipCode: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Add this line

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(" ") : value;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === "cardNumber") {
      processedValue = formatCardNumber(value);
    } else if (name === "expiry") {
      processedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .slice(0, 5);
    } else if (name === "cvv") {
      processedValue = value.replace(/\D/g, "").slice(0, 3);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (activeStep === 0) {
      if (!formData.fullName) newErrors.fullName = "Full name is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.address) newErrors.address = "Address is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.zipCode) newErrors.zipCode = "ZIP code is required";
    } else if (activeStep === 1) {
      if (!formData.cardName) newErrors.cardName = "Name on card is required";
      if (
        !formData.cardNumber ||
        formData.cardNumber.replace(/\s/g, "").length !== 16
      ) {
        newErrors.cardNumber = "Valid card number is required";
      }
      if (
        !formData.expiry ||
        !formData.expiry.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)
      ) {
        newErrors.expiry = "Valid expiry date is required (MM/YY)";
      }
      if (!formData.cvv || !formData.cvv.match(/^[0-9]{3}$/)) {
        newErrors.cvv = "Valid CVV is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  
  
  // Inside the PaymentPage component
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setIsLoading(true);
        
        // Get data from localStorage
        const userData = JSON.parse(localStorage.getItem('userData'));
        const ticketData = JSON.parse(localStorage.getItem('selectedTicket'));
        
        // Get event manager ID from the event
        const eventDoc = await getDoc(doc(db, 'events', ticketData.eventId));
        if (!eventDoc.exists()) {
          throw new Error('Event not found');
        }
        const eventData = eventDoc.data();
        
        // Create order object
        const order = {
          customer: {
            id: userData?.uid || '',
            name: formData.fullName || '',
            email: formData.email || '',
            address: {
              street: formData.address || '',
              city: formData.city || '',
              state: formData.state || '',
              zip: formData.zipCode || ''
            }
          },
          event: {
            id: ticketData?.eventId || '',
            title: ticketData?.eventTitle || '',
            managerId: eventData?.managerId || '',
            date: ticketData?.eventDate || '',
            location: ticketData?.eventLocation || ''
          },
          ticket: {
            type: ticketData?.package?.name || '',
            price: ticketData?.package?.price || 0,
            benefits: ticketData?.package?.benefits || []
          },
          payment: {
            method: 'Credit Card',
            cardLast4: formData?.cardNumber?.slice(-4) || '',
            amount: ticketData?.package?.price || 0,
            status: 'completed',
            date: new Date().toISOString()
          },
          status: 'confirmed',
          createdAt: new Date().toISOString()
        };
  
        // Save to Firestore
        const ordersCollection = collection(db, 'orders');
        await addDoc(ordersCollection, order);
        
        // Show success and redirect
        toast.success('Payment successful! Your order has been confirmed.');
        navigate('/events');
        
      } catch (error) {
        console.error('Error creating order:', error);
        toast.error(`Payment failed: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const steps = ["Billing Address", "Payment Details", "Confirmation"];

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="payment-modal"
      aria-describedby="payment-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <Container maxWidth="lg">
        <Card
          sx={{
            maxHeight: "90vh",
            overflowY: "auto",
            position: "relative",
            borderRadius: 2,
            boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
          }}
        >
          <IconButton
            onClick={onClose}
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

          <Paper className="styled-paper">
            <Box sx={{ mb: 4, textAlign: "center" }}>
              <Typography variant="h4" gutterBottom>
                Checkout
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Complete your purchase securely
              </Typography>
            </Box>

            <Stepper
              activeStep={activeStep}
              sx={{
                mb: 4,
                "& .MuiStepLabel-root .Mui-completed": {
                  color: "success.main",
                },
              }}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <form onSubmit={handleSubmit}>
              <Fade in={true}>
                <Box>
                  {activeStep === 0 ? (
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                          Billing Address
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          error={!!errors.fullName}
                          helperText={errors.fullName}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Person />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          error={!!errors.email}
                          helperText={errors.email}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Email />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          error={!!errors.address}
                          helperText={errors.address}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Home />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="City"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          error={!!errors.city}
                          helperText={errors.city}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocationOn />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          fullWidth
                          label="State"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          error={!!errors.state}
                          helperText={errors.state}
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          fullWidth
                          label="ZIP Code"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          error={!!errors.zipCode}
                          helperText={errors.zipCode}
                        />
                      </Grid>
                    </Grid>
                  ) : activeStep === 1 ? (
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                          Card Information
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <div className="payment-card">
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Typography variant="h6">Credit Card</Typography>
                            <Payment sx={{ fontSize: 32 }} />
                          </Box>
                          <div className="card-number">
                            {formData.cardNumber || "•••• •••• •••• ••••"}
                          </div>
                          <Grid container spacing={2}>
                            <Grid item xs={8}>
                              <Typography variant="body2" sx={{ mb: 0.5 }}>
                                CARD HOLDER
                              </Typography>
                              <Typography>
                                {formData.cardName || "YOUR NAME"}
                              </Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <Typography variant="body2" sx={{ mb: 0.5 }}>
                                EXPIRES
                              </Typography>
                              <Typography>
                                {formData.expiry || "MM/YY"}
                              </Typography>
                            </Grid>
                          </Grid>
                        </div>

                        <Card variant="outlined" sx={{ p: 3 }}>
                          <Grid container spacing={3}>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                label="Name on Card"
                                name="cardName"
                                value={formData.cardName}
                                onChange={handleInputChange}
                                error={!!errors.cardName}
                                helperText={errors.cardName}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Person />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                label="Card Number"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                error={!!errors.cardNumber}
                                helperText={errors.cardNumber}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <CreditCard />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                fullWidth
                                label="Expiry Date"
                                name="expiry"
                                placeholder="MM/YY"
                                value={formData.expiry}
                                onChange={handleInputChange}
                                error={!!errors.expiry}
                                helperText={errors.expiry}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <CalendarToday />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                fullWidth
                                label="CVV"
                                name="cvv"
                                type="password"
                                value={formData.cvv}
                                onChange={handleInputChange}
                                error={!!errors.cvv}
                                helperText={errors.cvv}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <Lock />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Card>
                      </Grid>
                    </Grid>
                  ) : (
                    <Box sx={{ textAlign: "center" }}>
                      <CheckCircle
                        color="success"
                        sx={{ fontSize: 60, mb: 2 }}
                      />
                      <Typography variant="h5" gutterBottom>
                        Review Your Order
                      </Typography>
                      <Alert severity="info" sx={{ mb: 3 }}>
                        Please review your information before confirming the
                        payment
                      </Alert>
                      <Card
                        variant="outlined"
                        sx={{ mb: 3, textAlign: "left" }}
                      >
                        <CardContent>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Typography variant="subtitle1" gutterBottom>
                                Billing Address
                              </Typography>
                              <Typography color="text.secondary">
                                {formData.fullName}
                                <br />
                                {formData.address}
                                <br />
                                {formData.city}, {formData.state}{" "}
                                {formData.zipCode}
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Divider sx={{ my: 2 }} />
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="subtitle1" gutterBottom>
                                Payment Method
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <CreditCard color="primary" />
                                <Typography>
                                  Card ending in {formData.cardNumber.slice(-4)}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Box>
                  )}
                </Box>
              </Fade>

              <Divider sx={{ my: 4 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                  className="back-button"
                >
                  Back
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    type="submit"
                    className="next-button"
                  >
                    Confirm Payment
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    className="next-button"
                  >
                    Next
                  </Button>
                )}
              </Box>
            </form>
          </Paper>
        </Card>
      </Container>
    </Modal>
  );
};

export default PaymentPage;
