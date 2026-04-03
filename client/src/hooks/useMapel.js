import { useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

export function useMapel() {
  const [mapel, setMapel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMapel = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/subjects");
      const data = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
      setMapel(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setMapel([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMapel();
  }, [fetchMapel]);

  const addMapel = async (data) => {
    await api.post("/subjects", data);
    await fetchMapel();
  };

  const updateMapel = async (id, data) => {
    await api.put(`/subjects/${id}`, data);
    await fetchMapel();
  };

  const deleteMapel = async (id) => {
    await api.delete(`/subjects/${id}`);
    await fetchMapel();
  };

  return { mapel, loading, error, addMapel, updateMapel, deleteMapel, refetch: fetchMapel };
}