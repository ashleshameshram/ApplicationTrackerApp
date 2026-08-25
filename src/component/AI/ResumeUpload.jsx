import { useState } from 'react'
import * as pdfjsLib from "pdfjs-dist";

import {Box, Typography, Button, Stack,} from '@mui/material';
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

export default function ResumeUpload( { setResumeText }) {
    const [resumeFile,setResumeFile] = useState(null);

    let handleResumeUpload = async (e) => {
        const file = e.target.files[0];
        setResumeFile(file);

        const arrayBuffer = await file.arrayBuffer();
        
        const pdf = await pdfjsLib.getDocument({
            data: arrayBuffer,
        }).promise;

        let extractedText = "";

        for(let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++){
            const page = await pdf.getPage(pageNumber);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
                .map((item) => item.str).join(' ');
            extractedText += pageText + '\n';
        }
        setResumeText(extractedText.trim());
    }

    return(
        <>
        {/* Resume row */}
        <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 0.8, sm: 1.2 }}
            sx={{
                border: '1px solid #E7E3F2',
                borderRadius: { xs: 1.75, sm: 2.5 },
                p: { xs: 1, sm: 1.5 },
                mb: { xs: 1.75, sm: 2.5 },
                flexWrap: 'wrap',
        }}>

        <DescriptionOutlinedIcon sx={{ fontSize: { xs: 15, sm: 18 }, color: '#6D28D9', flexShrink: 0 }} />
        <Typography
            sx={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: { xs: '0.72rem', sm: '0.85rem' },
            color: '#1F1436',
        }}> Resume
        </Typography>

        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            size="small"
            startIcon={<CloudUploadIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
            sx={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            textTransform: 'none',
            fontSize: { xs: '0.68rem', sm: '0.76rem' },
            px: { xs: 1.2, sm: 1.6 },
            py: { xs: 0.4, sm: 0.55 },
            borderRadius: '8px',
            ml: { xs: 1, sm: 2 },
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
                justifyContent: 'center',
                gap: 0.8,
            }}>
            <CheckCircleOutlineOutlinedIcon sx={{ fontSize: { xs: 16, sm: 18 }, color: '#1E8E5A', flexShrink: 0 }} />
            <Typography
                sx={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: { xs: '0.72rem', sm: '0.82rem' },
                color: '#166945',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                minWidth: 0,
            }}>
                {resumeFile.name}
            </Typography>
            </Box>
        )}
        </Stack>
        </>
    )
}