import dayjs from 'dayjs';

export function friendlyDate(value: Date|string|number) {
    if (!value || dayjs(value).isValid() === false) {
        return 'n/a';
    }
    const date = dayjs(value);
    return dayjs().diff(date, 'hours') < 24
        ? date.format('MM/DD HH:mm')
        : date.format('MM/DD/YYYY');
}
