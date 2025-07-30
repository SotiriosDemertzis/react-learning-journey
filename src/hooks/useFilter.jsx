import { useMemo } from 'react';

/**
 * Custom React hook for filtering and searching through a list of tasks.
 * 
 * @description This hook provides efficient filtering of tasks based on completion status
 * and search terms. It uses React's useMemo to optimize performance by only recalculating
 * the filtered results when dependencies change.
 * 
 * @param {Array<Object>} tasks - Array of task objects to filter
 * @param {Object} tasks[].completed - Boolean indicating if the task is completed
 * @param {string} tasks[].description - The task description/title
 * @param {string} filterStatus - Filter criteria: 'All', 'Active', or 'Completed'
 * @param {string} searchTerm - Search string to match against task descriptions (case-insensitive)
 * 
 * @returns {Array<Object>} Filtered array of tasks matching the specified criteria
 * 
 */
export default function useFilter(tasks, filterStatus, searchTerm) {
  /* Memoize filtered tasks for performance
     First Render: Runs the filtering logic, stores the result
     Subsequent Renders: Only recalculates if tasks, filterStatus, or searchTerm change
     This avoids unnecessary recalculations and improves performance, especially with large task lists.
  */
  return useMemo(() => {
    let filtered = tasks;
    if (filterStatus === 'Active') {
      filtered = filtered.filter(task => !task.completed);
    } else if (filterStatus === 'Completed') {
      filtered = filtered.filter(task => task.completed);
    }
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [tasks, filterStatus, searchTerm]);
}