import { format, type DateArg } from "date-fns";

// (alias) type DateArg<DateType extends Date> = string | number | DateType

export function formatDate(date: DateArg<Date>)
{
    return format(date, 'dd MMM yyyy h:m a');
}