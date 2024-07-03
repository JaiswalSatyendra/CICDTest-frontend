import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button, Tooltip, useTheme } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const CopyBucketPolicy = ({ bucketName }) => {
  const theme = useTheme();
  const [copiedText, setCopiedText] = useState();
  let bucketPolicy = `{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "DelegateS3Access",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::383236716621:user/convertml-connectors"
            },
            "Action": [
                "s3:ListBucket",
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::${bucketName}/*",
                "arn:aws:s3:::${bucketName}"
            ]
        }
    ]
}`;

  return (
    <CopyToClipboard
      text={bucketPolicy}
      onCopy={() => setCopiedText(bucketPolicy)}
    >
      <Tooltip
        title={
          copiedText === bucketPolicy ? "This was Copied!" : "Copy To Clipboard"
        }
        placement="top"
      >
        <Button
          sx={{
            mt: 3,
          }}
          color="primary"
          size="large"
          variant="contained"
          startIcon={<ContentCopyIcon />}
        >
          {"Copy Bucket Policy"}
        </Button>
      </Tooltip>
    </CopyToClipboard>
  );
};

export default CopyBucketPolicy;
