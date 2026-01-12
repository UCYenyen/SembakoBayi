import * as React from "react"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/shadcn-ui/input"

type PhoneInputProps = Omit<React.ComponentProps<typeof Input>, "onChange"> & {
  value: string
  onChange: (value: string) => void
  defaultCountry?: "ID" | "US" | "SG" | string
}

const ShadcnPhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, value, onChange, defaultCountry = "ID", ...props }, ref) => {
    return (
      <PhoneInput
        inputComponent={Input}
        defaultCountry={defaultCountry as any}
        international
        withCountryCallingCode
        value={value}
        onChange={(val) => onChange(val as string)}
        className={cn(
          "flex gap-2 items-center",
          "[&_.PhoneInputCountry]:mr-2",
          "[&_.PhoneInputCountrySelect]:h-full [&_.PhoneInputCountrySelect]:w-full",
          className
        )}
        numberInputProps={{
          className: cn("rounded-md focus-visible:ring-1"),
          ref: ref,
          ...props,
        }}
      />
    )
  }
)

ShadcnPhoneInput.displayName = "ShadcnPhoneInput"

export { ShadcnPhoneInput }