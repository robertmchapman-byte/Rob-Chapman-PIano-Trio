/*
 * Copyright 2026 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const DB_NAME = 'TrioAudioDB';
const DB_VERSION = 1;
const STORE_NAME = 'tracks';

interface StoredAudio {
  id: string;
  blob: Blob;
  fileName: string;
  updatedAt: number;
}

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export async function saveTrackAudio(trackId: string, file: File): Promise<string> {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    const record: StoredAudio = {
      id: trackId,
      blob: file,
      fileName: file.name,
      updatedAt: Date.now(),
    };

    return new Promise((resolve, reject) => {
      const request = store.put(record);
      request.onsuccess = () => {
        const objectUrl = URL.createObjectURL(file);
        resolve(objectUrl);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.error('Error saving track audio to IndexedDB:', err);
    return URL.createObjectURL(file);
  }
}

export async function getTrackAudio(trackId: string): Promise<{ blobUrl: string; fileName: string } | null> {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve, reject) => {
      const request = store.get(trackId);
      request.onsuccess = () => {
        const result = request.result as StoredAudio | undefined;
        if (result && result.blob) {
          const blobUrl = URL.createObjectURL(result.blob);
          resolve({ blobUrl, fileName: result.fileName });
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('Error reading track audio from IndexedDB:', err);
    return null;
  }
}

export async function removeTrackAudio(trackId: string): Promise<boolean> {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve) => {
      const request = store.delete(trackId);
      request.onsuccess = () => resolve(true);
      request.onerror = () => resolve(false);
    });
  } catch (err) {
    console.warn('Error removing track audio from IndexedDB:', err);
    return false;
  }
}

export async function getAllStoredTracks(): Promise<Record<string, { blobUrl: string; fileName: string }>> {
  try {
    const db = await openDB();
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);

    return new Promise((resolve) => {
      const request = store.getAll();
      request.onsuccess = () => {
        const records = (request.result || []) as StoredAudio[];
        const map: Record<string, { blobUrl: string; fileName: string }> = {};
        records.forEach((rec) => {
          if (rec.blob) {
            map[rec.id] = {
              blobUrl: URL.createObjectURL(rec.blob),
              fileName: rec.fileName,
            };
          }
        });
        resolve(map);
      };
      request.onerror = () => resolve({});
    });
  } catch (err) {
    console.warn('Error fetching all stored tracks:', err);
    return {};
  }
}
