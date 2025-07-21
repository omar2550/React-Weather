import "./App.css";
import { useState, useEffect } from "react";
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { getWeather } from "./weatherSlice";

//Materiel UI
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  moment.locale("ar");

  const { t, i18n } = useTranslation(),
    [date, setDate] = useState(""),
    [lang, setLang] = useState("ar"),
    isLoading = useSelector((state) => state.weather.loading),
    temp = useSelector((state) => state.weather.weather),
    dispatch = useDispatch();

useEffect(() => {
  dispatch(getWeather());
  i18n.changeLanguage("ar");
  setDate(moment().format("dddd, MMMM Do YYYY"));
}, [dispatch, i18n]);

  return (
    <div className="App" style={{ direction: lang === "ar" ? "rtl" : "ltr" }}>
      <Container maxWidth="sm">
        <header className="App-header">
          <Card
            sx={{
              width: "100%",
              backgroundColor: "#0000000f",
              color: "#FFF",
            }}
          >
            <CardContent>
              <Stack
                spacing={2}
                direction="row"
                sx={{ alignItems: "flex-end" }}
              >
                <Typography
                  variant="h2"
                  style={{ marginLeft: "10px", marginRight: "10px" }}
                >
                  {t("Cairo")}
                </Typography>
                <Typography variant="h6" style={{ marginBottom: "10px" }}>
                  {date}
                </Typography>
              </Stack>
              <hr />
              <Stack
                direction="row"
                sx={{ alignItems: "center", justifyContent: "space-between" }}
              >
                <div style={{ marginBottom: "15px" }}>
                  <Typography variant="h2">
                    {isLoading === true ? (
                      <CircularProgress sx={{ color: "#FFF" }} />
                    ) : (
                      temp.main
                    )}
                    <img src={temp.icon} alt="" />
                  </Typography>
                  <Typography variant="h6">{t(temp.desc)}</Typography>
                  <Stack direction="row">
                    <Typography variant="body2">
                      {t("max")}: {temp.max}
                    </Typography>
                    <Typography variant="body2" style={{ margin: "0 7px" }}>
                      |
                    </Typography>
                    <Typography variant="body2" style={{ margin: "0" }}>
                      {t("min")}: {temp.min}
                    </Typography>
                  </Stack>
                </div>
                <WbCloudyIcon style={{ fontSize: "200px", margin: "0" }} />
              </Stack>
            </CardContent>
          </Card>
          <div style={{ marginTop: "10px", textAlign: "end", width: "100%" }}>
            <Button
              variant="contained"
              onClick={() => {
                if (lang === "ar") {
                  setLang("en");
                  i18n.changeLanguage("en");

                  moment.locale("en");
                } else {
                  setLang("ar");
                  i18n.changeLanguage("ar");

                  moment.locale("ar");
                }

                setDate(moment().format("dddd, MMMM Do YYYY"));
              }}
            >
              {lang === "ar" ? "English" : "العربية"}
            </Button>
          </div>
        </header>
      </Container>
    </div>
  );
}

export default App;
