import React, { useState } from "react";
import Head from "next/head";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import { theme } from "../theme";

export default function Home() {
  const [query, setQuery] = useState("");
  const [nutrition, setNutrition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchNutrition = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/nutrition?query=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (response.ok) {
        setNutrition(data);
      } else {
        setNutrition(null);
        setError(data.error || "Failed to fetch nutrition data");
      }
    } catch (err) {
      setNutrition(null);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchNutrition();
    }
  };

  return (
    <>
      <Head>
        <title> Nutrition Facts Finder</title>
        <meta
          name="description"
          content="Find nutritional information for any food item"
        />
      </Head>

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              color: "#1a202c",
              mb: 2,
            }}
          >
            🥗 Nutrition Facts Finder
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "#4a5568",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
            }}
          >
            Discover detailed nutritional information for any food
          </Typography>
        </Box>

        <Paper
          elevation={8}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: 2,
            background: "white",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <TextField
              fullWidth
              label="Search any food"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  fontFamily: "Poppins, sans-serif",
                  backgroundColor: "white",
                  "& fieldset": {
                    borderColor: "#d1d5db",
                  },
                  "&:hover fieldset": {
                    borderColor: "#10b981",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#10b981",
                  },
                },
                "& .MuiInputLabel-root": {
                  fontFamily: "Poppins, sans-serif",
                  color: "#6b7280",
                  "&.Mui-focused": {
                    color: "#10b981",
                  },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={searchNutrition}
              disabled={loading || !query.trim()}
              sx={{
                minWidth: 120,
                height: 56,
                borderRadius: 2,
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                background: theme.gradients.primary,
                "&:hover": {
                  background: theme.gradients.primaryHover,
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Search"
              )}
            </Button>
          </Box>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {nutrition && (
          <Card
            elevation={8}
            sx={{
              borderRadius: 2,
              background: "white",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  color: "#2d3748",
                  textTransform: "capitalize",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                }}
              >
                {nutrition.name}
              </Typography>

              {nutrition.category && (
                <Chip
                  label={nutrition.category}
                  sx={{
                    mb: 2,
                    background: theme.gradients.primary,
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                  }}
                />
              )}

              <Typography
                variant="subtitle1"
                sx={{
                  color: "#718096",
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                }}
              >
                Nutritional values per 100g (USDA standard)
              </Typography>

              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        color: "#2d3748",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      Macronutrients
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Chip
                        label={`Calories: ${nutrition.calories} kcal`}
                        sx={{
                          background: "#ff6b6b",
                          color: "white",
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 500,
                        }}
                      />
                      <Chip
                        label={`Protein: ${nutrition.protein}g`}
                        sx={{
                          background: "#4ecdc4",
                          color: "white",
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 500,
                        }}
                      />
                      <Chip
                        label={`Carbs: ${nutrition.carbs}g`}
                        sx={{
                          background: "#45b7d1",
                          color: "white",
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 500,
                        }}
                      />
                      <Chip
                        label={`Fat: ${nutrition.fat}g`}
                        sx={{
                          background: "#f9ca24",
                          color: "white",
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 500,
                        }}
                      />
                      <Chip
                        label={`Fiber: ${nutrition.fiber}g`}
                        sx={{
                          background: "#6c5ce7",
                          color: "white",
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 500,
                        }}
                      />
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Box>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        color: "#2d3748",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 600,
                        mb: 2,
                      }}
                    >
                      Vitamins & Minerals
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      {nutrition.vitamins &&
                        nutrition.vitamins.map((vitamin, index) => (
                          <Chip
                            key={index}
                            label={vitamin}
                            sx={{
                              borderColor: "#10b981",
                              color: "#10b981",
                              fontFamily: "Poppins, sans-serif",
                              fontWeight: 500,
                              "&:hover": {
                                background: "rgba(16, 185, 129, 0.1)",
                              },
                            }}
                            variant="outlined"
                          />
                        ))}
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {nutrition.benefits && (
                <Box sx={{ mt: 3 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      color: "#2d3748",
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                      mb: 2,
                    }}
                  >
                    Health Benefits
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#4a5568",
                      fontFamily: "Poppins, sans-serif",
                      lineHeight: 1.6,
                    }}
                  >
                    {nutrition.benefits}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        )}

        <Box textAlign="center" mt={6}>
          <Typography
            variant="caption"
            sx={{
              color: "#6b7280",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            Powered by USDA FoodData Central - Search thousands of foods!
          </Typography>
        </Box>
      </Container>
    </>
  );
}
