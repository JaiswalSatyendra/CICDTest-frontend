import { useRef, useState, useEffect } from "react";

import {
  IconButton,
  Box,
  List,
  ListItem,
  Divider,
  Typography,
  ListItemText,
  alpha,
  Popover,
  Tooltip,
  styled,
  useTheme,
} from "@mui/material";
import Text from "../../../../../components/Text";
import "./index.scss";
import WarningTwoToneIcon from "@mui/icons-material/WarningTwoTone";
import internationalization from "../../../../../i18n/i18n";
import { useTranslation } from "react-i18next";

import deFlag from "country-flag-icons/3x2/DE.svg";
import usFlag from "country-flag-icons/3x2/US.svg";
import esFlag from "country-flag-icons/3x2/ES.svg";
import frFlag from "country-flag-icons/3x2/FR.svg";
import cnFlag from "country-flag-icons/3x2/CN.svg";
import aeFlag from "country-flag-icons/3x2/AE.svg";
import inFlag from "country-flag-icons/3x2/IN.svg";
import ruFlag from "country-flag-icons/3x2/RU.svg";


const SectionHeading = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
        padding: ${theme.spacing(2, 2, 0)};
`
);

const ImageWrapper = styled("img")(
  () => `
        width: 30px;
`
);

const IconButtonWrapper = styled(IconButton)(
  ({ theme }) => `
  width: ${theme.spacing(4)};
  height: ${theme.spacing(4)};
`
);

function changeLanguageByButtonClick(lng) {
  var selectField = document.querySelector("#google_translate_element select");
  for (var i = 0; i < selectField.children.length; i++) {
    var option = selectField.children[i];
    // find desired langauge and change the former language of the hidden selection-field
    if (option.value == lng) {
      selectField.selectedIndex = i;
      selectField.dispatchEvent(new Event("change"));
      break;
    }
  }
}

function LanguageSwitcher() {

  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [lang, setlang] = useState(
    localStorage.getItem("coiniskylang") ?? "en"
  );
  const theme = useTheme();

  const switchLanguage = ({ lng }) => {
    setlang(lng);
    localStorage.setItem("coiniskylang", lng);
    changeLanguageByButtonClick(lng);
    handleClose();
  };
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip arrow title={t("Language Switcher")}>
        <IconButtonWrapper
          color="secondary"
          ref={ref}
          onClick={handleOpen}
          style={{ padding: "0px" }}
          sx={{
            mx: 1,
            // background: alpha(theme.colors.error.main, 0.1),
            transition: `${theme.transitions.create(["background"])}`,
            // color: theme.colors.error.main,

            "&:hover": {
              // background: alpha(theme.colors.error.main, 0.2),
            },
          }}
        >
          {lang == "ru" && <ImageWrapper alt="Russian" src={ruFlag} />}
          {lang == "en" && <ImageWrapper alt="English" src={usFlag} />}
          {lang == "fr" && <ImageWrapper alt="French" src={frFlag} />}
          {lang == "hi" && <ImageWrapper alt="Arabic" src={inFlag} />}
          {lang == "es" && <ImageWrapper alt="Spanish" src={esFlag} />}
          {lang == "de" && <ImageWrapper alt="German" src={deFlag} />}
        </IconButtonWrapper>
      </Tooltip>
      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        className="popover"
        open={isOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          sx={{
            maxWidth: 240,
          }}
        >
          <SectionHeading variant="body2" color="text.primary">
            {t("Language Switcher")}
          </SectionHeading>
          <List
            sx={{
              p: 2,
            }}
            component="nav"
          >
            <ListItem
              className={lang === "en" || lang === "en-US" ? "active" : ""}
              button
              onClick={() => {
                switchLanguage({ lng: "en" });
                handleClose();
              }}
            >
              <ImageWrapper alt="English" src={usFlag} />
              <ListItemText
                sx={{
                  pl: 1,
                }}
                primary="English"
              />
            </ListItem>
            <ListItem
              className={lang === "hi" ? "active" : ""}
              button
              onClick={() => {
                switchLanguage({ lng: "hi" });
                handleClose();
              }}
            >
              <ImageWrapper alt="Hindi" src={inFlag} />
              <ListItemText
                sx={{
                  pl: 1,
                }}
                primary="Hindi"
              />
            </ListItem>
            <ListItem
              className={lang === "fr" ? "active" : ""}
              button
              onClick={() => {
                switchLanguage({ lng: "fr" });
                handleClose();
              }}
            >
              <ImageWrapper alt="French" src={frFlag} />
              <ListItemText
                sx={{
                  pl: 1,
                }}
                primary="French"
              />
            </ListItem>
            <ListItem
              className={lang === "ru" ? "active" : ""}
              button
              onClick={() => {
                switchLanguage({ lng: "ru" });
                handleClose();
              }}
            >
              <ImageWrapper alt="Russian" src={ruFlag} />
              <ListItemText
                sx={{
                  pl: 1,
                }}
                primary="Russian"
              />
            </ListItem>

            <ListItem
              className={lang === "de" ? "active" : ""}
              button
              onClick={() => {
                switchLanguage({ lng: "de" });
                handleClose();
              }}
            >
              <ImageWrapper alt="Spanish" src={deFlag} />
              <ListItemText
                sx={{
                  pl: 1,
                }}
                primary="Spanish"
              />
            </ListItem>

            <ListItem
              className={lang === "es" ? "active" : ""}
              button
              onClick={() => {
                switchLanguage({ lng: "es" });
                handleClose();
              }}
            >
              <ImageWrapper alt="German" src={esFlag} />
              <ListItemText
                sx={{
                  pl: 1,
                }}
                primary="German"
              />
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Popover>
    </>
  );
}

export default LanguageSwitcher;
