/**
 * useDetailPageData Hook
 * Consolidates fetch logic for all detail pages (projects, blog, gallery, jobs, training)
 * 
 * Handles:
 * - Loading state management
 * - Error handling
 * - Component unmount cleanup (prevents memory leaks)
 * - Optional mock data fallback (instant UX)
 * 
 * Usage:
 * const { data, loading, error } = useDetailPageData(
 *   projectsService.getProjectById,
 *   projectId,
 *   mockProject // optional
 * );
 */

import { useState, useEffect } from 'react';

const useDetailPageData = (
  fetchFunction,  // async function that takes param and returns data
  param,          // route parameter (id, slug, courseId, etc.)
  mockData = null // optional fallback data for instant UX
) => {
  const [data, setData] = useState(mockData || null);
  const [loading, setLoading] = useState(!mockData); // Only show loading if no mock data
  const [error, setError] = useState(null);

  useEffect(() => {
    // Flag to track if component is still mounted
    let isMounted = true;

    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true);
        
        // Call the fetch function with the parameter
        const result = await fetchFunction(param);
        
        // Only update state if component is still mounted
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        // Only update state if component is still mounted
        if (isMounted) {
          console.error(`Failed to fetch data for ${param}:`, err);
          setError(err.message || 'Failed to load data');
        }
      } finally {
        // Only update state if component is still mounted
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup: Mark component as unmounted
    return () => {
      isMounted = false;
    };
  }, [param, fetchFunction]);

  return { data, loading, error };
};

export default useDetailPageData;
