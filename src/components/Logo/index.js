import { Box, styled, Tooltip, tooltipClasses } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        padding: ${theme.spacing(0, 1, 0, 0)};
        display: flex;
        text-decoration: none;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const LogoSignWrapper = styled(Box)(
  () => `
        width: 52px;
        height: 38px;
        margin-top: 4px;
        transform: scale(.8);
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
    <LogoWrapper to="/overview">
      {" "}
      <TooltipWrapper title={t("ConvertML")} arrow>
        <LogoWrapper to="/">
          <LogoSignWrapper>
            <Box
              component="img"
              sx={{
                width: 210, 
                height: 50,
                maxWidth: 210,
              }}
              mt={-1.5}
              alt="ConvertML"
              src={"/images/convertmlLogo.png"}
            />
          </LogoSignWrapper>
        </LogoWrapper>
      </TooltipWrapper>
    </LogoWrapper>
  );
}

export default Logo;
