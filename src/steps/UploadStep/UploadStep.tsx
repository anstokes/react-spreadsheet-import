import type XLSX from "xlsx-ugnis"
import { Box, Button, Heading, ModalBody, Text, useStyleConfig } from "@chakra-ui/react"
import { CgSoftwareDownload } from "react-icons/cg"
import { DropZone } from "./components/DropZone"
import { useRsi } from "../../hooks/useRsi"
import { ExampleTable } from "./components/ExampleTable"
import { useCallback, useState } from "react"
import { FadingOverlay } from "./components/FadingOverlay"
import type { themeOverrides } from "../../theme"

type UploadProps = {
  downloadFile: string
  onContinue: (data: XLSX.WorkBook, file: File) => Promise<void>
}

export const UploadStep = ({ downloadFile, onContinue }: UploadProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const styles = useStyleConfig("UploadStep") as (typeof themeOverrides)["components"]["UploadStep"]["baseStyle"]
  const { translations, fields } = useRsi()
  const handleOnContinue = useCallback(
    async (data: XLSX.WorkBook, file: File) => {
      setIsLoading(true)
      await onContinue(data, file)
      setIsLoading(false)
    },
    [onContinue],
  )
  return (
    <ModalBody>
      <Heading sx={styles.heading}>{translations.uploadStep.title}</Heading>
      <Box>
        <Box display="inline-block" w={{ base: "100%", xl: "50%" }}>
          <Text sx={styles.title}>{translations.uploadStep.manifestTitle}</Text>
          <Text sx={styles.subtitle}>{translations.uploadStep.manifestDescription}</Text>
        </Box>
        {downloadFile && (
          <Box
            display="inline-flex"
            justifyContent={{ base: "start", xl: "end" }}
            sx={styles.download}
            w={{ base: "100%", xl: "50%" }}
          >
            <Button
              leftIcon={<CgSoftwareDownload />}
              onClick={() => {
                window.location.href = downloadFile
              }}
              sx={styles.downloadButton}
            >
              {translations.uploadStep.downloadTitle}
            </Button>
          </Box>
        )}
      </Box>
      <Box sx={styles.tableWrapper}>
        <ExampleTable fields={fields} />
        <FadingOverlay />
      </Box>
      <DropZone onContinue={handleOnContinue} isLoading={isLoading} />
    </ModalBody>
  )
}
