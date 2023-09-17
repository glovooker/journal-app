import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
   name: 'journal',
   initialState: {
      isSaving: false,
      messageSaved: '',
      notes: [],
      active: null,
      // active: {
      //    id: 'ABC123',
      //    title: '',
      //    body: '',
      //    date: 1234567,
      //    imageURLs: [],
      // }
   },
   reducers: {
      addNewEmptyNote: (state, action) => {
         state.notes.push(action.payload);
         state.isSaving = false;
      },
      savingNewNote: (state) => {
         state.isSaving = true;
      },
      setActiveNote: (state, action) => {
         state.active = action.payload;
         state.messageSaved = '';
      },
      setNotes: (state, action) => {
         state.notes = action.payload;
      },
      setSaving: (state) => {
         state.isSaving = true;
         state.messageSaved = '';
      },
      updateNote: (state, action) => {
         state.isSaving = false;
         state.notes = state.notes.map(note => note.id === action.payload.id ? action.payload : note);
         state.messageSaved = `${ action.payload.title }, actualizada correctamente`;
      },
      setPhotosToActiveNote: (state, action) => {
         state.isSaving = false;
         state.active.imageURLs = [...state.active.imageURLs, ...action.payload];
      },
      clearNotesLogout: (state) => {
         state.isSaving = false;
         state.messageSaved = '';
         state.notes = [];
         state.active = null;
      },
      deleteNoteById: (state, action) => {
         state.isSaving = false;
         state.active = null;
         state.notes = state.notes.filter(note => note.id !== action.payload);
      },
   }
});

export const {
   addNewEmptyNote,
   clearNotesLogout,
   deleteNoteById,
   savingNewNote,
   setActiveNote,
   setNotes,
   setPhotosToActiveNote,
   setSaving,
   updateNote,
} = journalSlice.actions;
