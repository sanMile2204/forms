import React, { useState } from "react";
import { getTickets, saveTickets } from "../../services/tickets";
import Ticket from "./Ticket";

interface FormData {
    title: string;
    priority: number;
    description: string;
    resolved: boolean;
  };

  const initialFormData = {
    title: '',
    priority: 3,
    description: '',
    resolved: false
  };

const TicketForm = () => {
    const [formData, setFormData] = React.useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [postError, setPostError] = useState('');
    const [tickets, setTickets] = useState<FormData[]>([]);
    const [showTickets, setShowTickets] = useState(false);
      
    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: type === 'checkbox' ? checked : value
        }));
        validateForm();
      };
    
    const handleSubmit = async(e: any) => {
        e.preventDefault();
        validateForm();
        const response = await saveTickets({ ticket: formData });
        if (response) {
            setPostError('Add ticket succesfully');
        } else {
            setPostError('Error, please try again later');
        }
        setFormData(initialFormData);
      };

      const validateForm = () => {
        if (formData.title.length < 6) {
            setErrors({ ...errors, title: 'Title must be at least 6 characters' });
          } else if(formData.title.length > 18) {
            setErrors({ ...errors, title: 'Title must have a maximum of 18 characters' });
          } 
        else if (formData.description.length == 0 || formData.description.length > 30 )  {
            setErrors({ ...errors, description: 'Description must have a maximum of 30 characters' });
          }
        else {
            setErrors({});
        }
      }

      const getAllTickets = async() => {
        const response: FormData[] = await getTickets();
        setTickets(response);
        setShowTickets(true);
      }

   
    return (
        <>
        <section className="container">
            <form className="container-form" onSubmit={handleSubmit}>
                <h1>Add Ticket</h1>
                {
                  postError ? <p className="saveMessage"> {postError}</p> : null
                }
                <label htmlFor="title">Title</label>
                <input type="text" id="title" placeholder="Add the ticket title"autoComplete='off' 
                onChange={handleChange}
                value={formData.title}
                name="title"
                />
                {errors.title && <p className="error-message">{errors.title}</p>}
                <label htmlFor="priority">Priority</label>
                <select id="priority"
                name="priority" 
                onChange={handleChange}>
                    <option value={3}>Low</option>
                    <option value={2}>Medium</option>
                    <option value={1}>High</option>
                </select>
                <label htmlFor="description">Description</label>
                <textarea id="description" placeholder="Add the ticket description" cols={22} rows={3} 
                onChange={handleChange}
                name="description" 
                value={formData.description}></textarea>
                {errors.description && <p className="error-message">{errors.description}</p>}
                <div className="checkbox-container">
                    <span>Mark as resolved</span>
                    <input type="checkbox" 
                    id="resolved" 
                    onChange={handleChange}
                    name="resolved" 
                    checked={formData.resolved}/>
                </div>
                <button type="submit" className="main-button">Submit</button>
                <button type="button" className="main-button" onClick={getAllTickets}>See all tickets</button>
            </form>
            
        </section>
        {
          showTickets ? 
          <section>
            <h1>All tickets</h1>
            <Ticket tickets={tickets}></Ticket>
        </section> : null
        }
        
        </>
    )
}

export default TicketForm;