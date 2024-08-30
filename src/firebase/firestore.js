import { db } from '../firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';

export const addAppointment = async (userId, date, service , name) => {
  try {
    const docRef = await addDoc(collection(db, "appointments"), {
      userId,
      date,
      service,
      name,
      status: 'pending'
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding appointment: ", error);
  }
};

export const getUserAppointments = async (userId) => {
  const q = query(collection(db, "appointments"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getAllAppointments = async () => {
  const querySnapshot = await getDocs(collection(db, "appointments"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const updateAppointment = async (id, data) => {
  const appointmentRef = doc(db, "appointments", id);
  await updateDoc(appointmentRef, data);
};

export const deleteAppointment = async (id) => {
  await deleteDoc(doc(db, "appointments", id));
};