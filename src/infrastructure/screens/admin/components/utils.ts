/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 *
 * @file This file contains utility functions used in the admin screen components.
 *
 * @date February 19, 2025
 * @description This file defines utility functions for displaying notifications and setting IDs.
 * @version 1.0.0
 * @author Saul Sosa
 */

/**
 * Displays a notification using the provided toast reference.
 *
 * @param {Object} params - The parameters for the notification.
 * @param {string} params.message - The message to be displayed in the notification.
 * @param {string} params.status - The severity status of the notification (e.g., 'success', 'error').
 * @param {Object} params.toastRef - The reference to the toast component.
 * @param {Object} params.toastRef.current - The current reference to the toast component.
 * @param {Function} params.toastRef.current.show - The function to show the toast notification.
 */
export const displayNotification = ({
  message,
  status,
  toastRef,
}: {
  message: string
  status
  toastRef
}) => {
  toastRef.current.show({ severity: status, detail: message, life: 3000 })
}

/**
 * Generates a new ID by incrementing the given maximum ID.
 *
 * @param maxId - The current maximum ID.
 * @returns The new ID as a string.
 */
export const setId = (maxId) => {
  const actualID = maxId + 1
  return actualID.toString()
}
