// hooks/useProperties.ts
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { toast } from "react-hot-toast";
import { Property } from "@/types/property"; // your property type

export function useProperties(page: number, limit: number) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/property/allproperty?page=${page}&limit=${limit}`);
        setProperties(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        toast.error("Failed to load properties");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [page, limit]);

  return { properties, loading, totalPages };
}
