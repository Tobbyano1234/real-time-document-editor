
const convertTo24HourFormat = (time: string): string => {
    const [timePart, modifier] = time.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
        hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
        hours = 0;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

const calculateDailyHours = (from: string, to: string): number => {
    const [fromHours, fromMinutes] = convertTo24HourFormat(from).split(':').map(Number);
    const [toHours, toMinutes] = convertTo24HourFormat(to).split(':').map(Number);

    let hours = toHours - fromHours;
    let minutes = toMinutes - fromMinutes;

    if (minutes < 0) {
        hours -= 1;
        minutes += 60;
    }

    return hours + minutes / 60;
};

type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

type WorkingHours = {
    expectedHours?: number,
    timezone: string,
    monday?: { from: string, to: string },
    tuesday?: { from: string, to: string },
    wednesday?: { from: string, to: string },
    thursday?: { from: string, to: string },
    friday?: { from: string, to: string },
    saturday?: { from: string, to: string },
    sunday?: { from: string, to: string }
};


const calculateExpectedHours = (workingHours: WorkingHours): number => {
    let totalHours = 0;

    const daysOfWeek: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    for (const day of daysOfWeek) {
        const dayHours = workingHours[day]; // TypeScript understands that day is a key of WorkingHours

        if (dayHours) {
            const { from, to } = dayHours;
            if (from && to) {
                totalHours += calculateDailyHours(from, to);
            }
        }
    }

    return totalHours;
};

// Example usage
const workingHours: WorkingHours = {
    timezone: 'UTC',
    monday: { from: '9:00 AM', to: '5:00 PM' },
    tuesday: { from: '9:00 AM', to: '5:00 PM' },
    wednesday: { from: '9:00 AM', to: '5:00 PM' },
    thursday: { from: '9:00 AM', to: '5:00 PM' },
    friday: { from: '9:00 AM', to: '5:00 PM' }
};

const expectedHours = calculateExpectedHours(workingHours);
console.log(`Expected Hours: ${expectedHours}`);

