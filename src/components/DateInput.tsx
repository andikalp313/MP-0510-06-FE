import * as React from "react";
import { format } from "date-fns";
import { Cake } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Calendar from "@/components/ui/calendar";

interface DateInputProps {
  value?: string;
  onChange?: (date: string | undefined) => void;
}

const formatDateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export function DateInput({ value, onChange }: DateInputProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    value ? new Date(value) : undefined,
  );

  React.useEffect(() => {
    setDate(value ? new Date(value) : undefined);
  }, [value]);

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    const formattedDate = selectedDate
      ? formatDateToString(selectedDate)
      : undefined;
    onChange && onChange(formattedDate);
  };

  console.log(date);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <Cake />

          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={handleDateChange} />
      </PopoverContent>
    </Popover>
  );
}
