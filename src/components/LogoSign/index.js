import { Box, Tooltip, tooltipClasses, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        width: 53px;
        margin: 0 auto;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const LogoSignWrapper = styled(Box)(
  () => `
        width: 210px;
        height: 65px;
        max-width: 210px !important ;
`
);

const TooltipWrapper = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: "bold",
    borderRadius: theme.general.borderRadiusSm,
    boxShadow:
      "0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100],
  },
}));

function Logo() {
  const { t } = useTranslation();

  return (
    <TooltipWrapper title={t("ConvertML")} arrow>
      <LogoWrapper to="/">
        <LogoSignWrapper>
          <Box
            component="img"
            sx={{
              width: 210,
              height: 55,
              maxWidth: 210,
              mx: "auto",
            }}
            alt="ConvertML"
            src={"/images/convertmlLogo.png"}
          />
        </LogoSignWrapper>
      </LogoWrapper>
    </TooltipWrapper>
  );
}

export default Logo;
