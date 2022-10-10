/*
1) MM DD-DD -- "Dec 5–12" - departure and return are in the same month | one - | STR NUM-NUM
2) MM DD-MM DD -- "Oct 29–Nov 5" - departure and return are in different month and the same year | one - | STR NUM-STR NUM
3) MM DD-DD, YY "Jan 21–30, 2023" -- departure and return are in the same month but next year | one -, one , | STR NUM-NUM, NUM
4) MM DD-MM DD, YY -- "Feb 23–Mar 3, 2023" - departure and return are in different months but next year | one -, one , | STR NUM-STR NUM, NUM
5) MM DD, YY-MM DD, YY -- "Dec 31, 2022–Jan 9, 2023" - departure and return are in different months and different years | one -, two , | STR NUM, NUM-STR NUM, NUM
*/
const formatLink = (origin, dates, destination) => {
    'Springfield-Virginia-USA'
    const originFormatted = origin.replace(/ /g, '%20').toLowerCase();
    const destinationFormatted = destination.replace(/ /g, '%20').toLowerCase();
    const currentYear = new Date().getFullYear();
    //** cover case 3,4,5
    if(dates.includes(',')) {
        const splitedDepartueAndReturn = dates.split(/-|–/);
        //** cover case 3,4
        if(dates.match(/,|,/g).length === 1) {
            /// cover case 3
            if(splitedDepartueAndReturn[1].match(/^[0-9]/)) {
                const splitedDepartue = splitedDepartueAndReturn[0].split(' ');
                const splitedReturn = splitedDepartueAndReturn[1].split(', ');
                const departueDay = splitedDepartue[1];
                const departueAndReturnMonth = splitedDepartue[0];
                const returnDay = splitedReturn[0];
                const departureAndReturnYear = splitedReturn[1];
                const departureFinal = `${departureAndReturnYear}-${departueAndReturnMonth}-${departueDay}`;
                const returnFinal = `${departureAndReturnYear}-${departueAndReturnMonth}-${returnDay}`;
                return `https://www.google.com/flights?q=Flights%20from%20${originFormatted}%20to%20${destinationFormatted}%20on%20${departureFinal}%20through%20${returnFinal}`;
            /// cover case 4
            } else {
                const splitedDepartue = splitedDepartueAndReturn[0].split(' ');
                const splitedReturn = splitedDepartueAndReturn[1].split(' ');
                const departueDay = splitedDepartue[1];
                const departueMonth = splitedDepartue[0];
                const returnDay = splitedReturn[1].replace(',', '');
                const returnMonth = splitedReturn[0];
                const departureAndReturnYear = splitedReturn[2];
                const departureFinal = `${departureAndReturnYear}-${departueMonth}-${departueDay}`;
                const returnFinal = `${departureAndReturnYear}-${returnMonth}-${returnDay}`;
                return `https://www.google.com/flights?q=Flights%20from%20${originFormatted}%20to%20${destinationFormatted}%20on%20${departureFinal}%20through%20${returnFinal}`;
            }
        /// cover case 5
        } else {
            const splitedDepartue = splitedDepartueAndReturn[0].split(' ');
            const splitedReturn = splitedDepartueAndReturn[1].split(' ');
            const departueDay = splitedDepartue[1].replace(',', '');
            const departueMonth = splitedDepartue[0];
            const departueYear = splitedDepartue[2];
            const returnDay = splitedReturn[1].replace(',', '');
            const returnMonth = splitedReturn[0];
            const returnYear = splitedReturn[2];
            const departureFinal = `${departueYear}-${departueMonth}-${departueDay}`;
            const returnFinal = `${returnYear}-${returnMonth}-${returnDay}`;
            return `https://www.google.com/flights?q=Flights%20from%20${originFormatted}%20to%20${destinationFormatted}%20on%20${departureFinal}%20through%20${returnFinal}`;
        }
    //** cover case 1,2
    } else {
        const splitedDepartueAndReturn = dates.split(/-|–/);
        /// cover case 1
        if(splitedDepartueAndReturn[1].match(/^[0-9]/)) {
            const splitedDepartue = splitedDepartueAndReturn[0].split(' ');
            const departueDay = splitedDepartue[1];
            const departueAndReturnMonth = splitedDepartue[0];
            const returnDay = splitedDepartueAndReturn[1];
            const departureFinal = `${currentYear}-${departueAndReturnMonth}-${departueDay}`;
            const returnFinal = `${currentYear}-${departueAndReturnMonth}-${returnDay}`;
            return `https://www.google.com/flights?q=Flights%20from%20${originFormatted}%20to%20${destinationFormatted}%20on%20${departureFinal}%20through%20${returnFinal}`;
        /// cover case 2
        } else {
            const splitedDepartue = splitedDepartueAndReturn[0].split(' ');
            const splitedReturn = splitedDepartueAndReturn[1].split(' ');
            const departueDay = splitedDepartue[1];
            const departueMonth = splitedDepartue[0];
            const returnDay = splitedReturn[1];
            const returnMonth = splitedReturn[0];
            const departureFinal = `${currentYear}-${departueMonth}-${departueDay}`;
            const returnFinal = `${currentYear}-${returnMonth}-${returnDay}`;
            return `https://www.google.com/flights?q=Flights%20from%20${originFormatted}%20to%20${destinationFormatted}%20on%20${departureFinal}%20through%20${returnFinal}`;
        }
    }
}

module.exports = formatLink;
    