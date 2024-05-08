import React, { useState, useEffect } from "react";
import axios from "../../api/axios";

interface Service {
  id: number;
  name: string;
  description: string;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get<Service[]>("/services");
        setServices(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div>
      <h1>Usługi</h1>
      {loading ? (
        <p>Ładowanie danych...</p>
      ) : (
        <ul>
          {services.map((service) => (
            <li key={service.id}>
              {service.name} - {service.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Services;
