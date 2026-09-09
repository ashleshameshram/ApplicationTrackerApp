import { useState } from 'react'
import * as pdfjsLib from "pdfjs-dist";

import { Box, Typography, Button, Stack } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { styled } from '@mui/material/styles';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function ResumeUpload({ setResumeText, setIsExtracting, setInputMessage }) {
    const [resumeFile, setResumeFile] = useState(null);

    let handleResumeUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setResumeFile(file);
        setIsExtracting(true);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            let extractedText = "";

            for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
                const page = await pdf.getPage(pageNumber);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map((item) => item.str).join(' ');
                extractedText += pageText + '\n';
            }
            setResumeText(extractedText.trim());
            setInputMessage("");
        } catch (e) {
            console.error("Resume extraction failed:", e);
        } finally {
            setIsExtracting(false);
        }
    }

    return (
        <Stack
            direction="row"
            spacing={{ xs: 0.7, sm: 1, md: 1.2}}
            alignItems="center"
            sx={{
                minWidth: 0,
                border: '1px solid #E7E3F2',
                borderRadius: { xs: 1.5, sm: 2, md: 2.5 },
                p: { xs: 0.85, sm: 1.25, md: 1.5 },
                mb: { xs: 1.5, sm: 2, md: 2.5 },
                flexWrap: 'wrap',
            }}>

            <DescriptionOutlinedIcon sx={{ fontSize: { xs: 14, sm: 16, md: 18 }, color: '#6D28D9', flexShrink: 0 }} />
            <Typography
                sx={{
                    fontFamily: "'Sora', sans-serif",
                    fontWeight: 600,
                    fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.85rem' },
                    color: '#1F1436',
                }}> Resume
            </Typography>

            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                size="small"
                startIcon={<CloudUploadIcon sx={{ fontSize: { xs: 13, sm: 14, md: 16 } }} />}
                sx={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: { xs: '0.64rem', sm: '0.7rem', md: '0.76rem' },
                    px: { xs: 1, sm: 1.4, md: 1.6 },
                    py: { xs: 0.35, sm: 0.5, md: 0.55 },
                    borderRadius: '8px',
                    ml: { xs: 0.75, sm: 1.5, md: 2 },
                    background: '#1F1436',
                    boxShadow: 'none',
                    '&:hover': { background: '#150D26', boxShadow: 'none' },
                }}>Upload file

                <VisuallyHiddenInput
                    type="file"
                    accept=".pdf"
                    onChange={handleResumeUpload}
                />
            </Button>

            {resumeFile && (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 0.8,
                    flex: '1 1 auto',
                    minWidth: 0,
                    maxWidth: { xs: '100%', sm: 200 },
                }}>
                    <CheckCircleOutlineOutlinedIcon sx={{ fontSize: { xs: 15, sm: 16, md: 18 }, color: '#1E8E5A', flexShrink: 0 }} />
                    <Typography
                        sx={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 600,
                            fontSize: { xs: '0.68rem', sm: '0.76rem', md: '0.82rem' },
                            color: '#166945',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            minWidth: 0,
                            flex: 1,
                        }}>
                        {resumeFile.name}
                    </Typography>
                </Box>
            )}
        </Stack>
    )
}