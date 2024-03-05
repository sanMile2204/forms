interface FormData {
    title: string;
    priority: number;
    description: string;
    resolved: boolean;
  };

const Ticket = ({ tickets }: { tickets: FormData[] }) => {
    
    return (
      <section className="container">
        <div className="container-form">
        {
            tickets.map(ticket => (
              <>

                <label htmlFor="title">Title</label>
                <input type="text" id="title" placeholder="Add the ticket title"autoComplete='off' 
                value={ticket.title}
                name="title"
                />
                <label htmlFor="priority">Priority</label>
                <select id="priority"
                name="priority">
                    <option value={3} selected={ticket.priority === 3}>Low</option>
                    <option value={2} selected={ticket.priority === 2}>Medium</option>
                    <option value={1} selected={ticket.priority === 1}>High</option>
                </select>
                <label htmlFor="description">Description</label>
                <textarea id="description" placeholder="Add the ticket description" cols={22} rows={3} 
                name="description" >{ticket.description}</textarea>
                <div className="checkbox-container">
                    <span>Mark as resolved</span>
                    <input type="checkbox" 
                    id="resolved" 
                    name="resolved" 
                    checked={ticket.resolved}/>
                </div>
                </>
              ))
        }
        </div>
    </section>
    )
}

export default Ticket;