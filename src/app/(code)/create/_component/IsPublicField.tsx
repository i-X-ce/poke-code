"use client";
import { Box, Chip, FormControlLabel, Switch } from "@mui/material";
import { memo } from "react";
import { Controller, useFormContext, UseFormReturn } from "react-hook-form";
import { CodeDataInput } from "@/lib/types/CodeDataModel";

const IsPublicField = memo(function IsPublicField() {
  const { control } = useFormContext<CodeDataInput>();

  return (
    <Box sx={{ userSelect: "none" }}>
      <Controller
        control={control}
        name="isPublic"
        render={({ field }) => (
          <FormControlLabel
            label={
              <Chip
                label={field.value ? "公開中" : "非公開"}
                color={field.value ? "primary" : "default"}
              />
            }
            control={<Switch checked={field.value} {...field} />}
          />
        )}
      />
    </Box>
  );
});

export default IsPublicField;
