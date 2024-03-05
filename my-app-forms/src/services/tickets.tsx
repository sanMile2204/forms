import '../App.css'

interface FormData {
    title: string;
    priority: number;
    description: string;
    resolved: boolean;
  };

export const saveTickets = async({ ticket }: { ticket: FormData }) => {
    try {
        const response = await fetch('http://localhost:3000/tickets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(ticket)
        });
        if (!response.ok) {
          return false;
        }

        return true;
      } catch (error) {
        return false;
      }
}

export const getTickets = async() => {
    try {
        const response = await fetch('http://localhost:3000/tickets');
        const json = await response.json();
        const tickets = json;
        return tickets;
      } catch (error) {
        throw new Error('Error');
      }
}