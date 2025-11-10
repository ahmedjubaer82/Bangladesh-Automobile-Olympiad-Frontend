import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALyfRCJYDe8JdAQ_WHvIov1ciBJUL4XRw",
  authDomain: "bangladesh-automobile-olympiad.firebaseapp.com",
  projectId: "bangladesh-automobile-olympiad",
  storageBucket: "bangladesh-automobile-olympiad.firebasestorage.app",
  messagingSenderId: "865573056497",
  appId: "1:865573056497:web:4559016b019a5bb7bc1e50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const seedData = async () => {
  try {
    // Seed News
    await addDoc(collection(db, 'news'), {
      title: 'Sample News Article 1',
      content: 'This is the content of the first sample news article. It provides general information about recent events.',
      imageUrl: 'https://img.freepik.com/free-vector/global-broadcast-breaking-news-banner-with-global-map_1017-59836.jpg?semt=ais_hybrid&w=740&q=80',
      createdAt: serverTimestamp(),
    });
    await addDoc(collection(db, 'news'), {
      title: 'Sample News Article 2',
      content: 'This is the content of the second sample news article. It covers a different topic of interest.',
      imageUrl: 'https://img.freepik.com/free-vector/global-broadcast-breaking-news-banner-with-global-map_1017-59836.jpg?semt=ais_hybrid&w=740&q=80',
      createdAt: serverTimestamp(),
    });

    // Seed Gallery
    await addDoc(collection(db, 'gallery'), {
      title: 'Beautiful Landscape',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcJAIYQclklzlMsLTXqPvhkSzlYqT21Mthnw&s',
      description: 'A stunning view of nature.',
      createdAt: serverTimestamp(),
    });
    await addDoc(collection(db, 'gallery'), {
      title: 'City at Night',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcJAIYQclklzlMsLTXqPvhkSzlYqT21Mthnw&s',
      description: 'Vibrant city lights after dark.',
      createdAt: serverTimestamp(),
    });

    // Seed Questions
    await addDoc(collection(db, 'questions'), {
      questionText: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      correctAnswer: 2,
      difficulty: 'easy',
      category: 'geography',
      createdAt: serverTimestamp(),
    });
    await addDoc(collection(db, 'questions'), {
      questionText: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
      correctAnswer: 1,
      difficulty: 'easy',
      category: 'astronomy',
      createdAt: serverTimestamp(),
    });

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

seedData();
