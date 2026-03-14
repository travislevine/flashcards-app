export interface QuizData {
  type: 'multiple-choice' | 'fill-in-the-blank';
  options?: string[];
}

export interface Flashcard {
  id: string;
  category: 'animals' | 'food' | 'verbs';
  spanish: string;
  english: string;
  quiz: QuizData;
}

export const flashcards: Flashcard[] = [
  // Animals
  {
    id: 'a1',
    category: 'animals',
    spanish: 'el gato',
    english: 'the cat',
    quiz: {
      type: 'multiple-choice',
      options: ['the dog', 'the house', 'the cat', 'the bird']
    }
  },
  {
    id: 'a2',
    category: 'animals',
    spanish: 'el perro',
    english: 'the dog',
    quiz: {
      type: 'multiple-choice',
      options: ['the cat', 'the dog', 'the mouse', 'the horse']
    }
  },
  {
    id: 'a3',
    category: 'animals',
    spanish: 'el pájaro',
    english: 'the bird',
    quiz: {
      type: 'multiple-choice',
      options: ['the fish', 'the cat', 'the dog', 'the bird']
    }
  },
  // Food
  {
    id: 'f1',
    category: 'food',
    spanish: 'la manzana',
    english: 'the apple',
    quiz: {
      type: 'multiple-choice',
      options: ['the banana', 'the orange', 'the apple', 'the pear']
    }
  },
  {
    id: 'f2',
    category: 'food',
    spanish: 'el pan',
    english: 'the bread',
    quiz: {
      type: 'multiple-choice',
      options: ['the bread', 'the cheese', 'the meat', 'the water']
    }
  },
  {
    id: 'f3',
    category: 'food',
    spanish: 'el queso',
    english: 'the cheese',
    quiz: {
      type: 'multiple-choice',
      options: ['the milk', 'the bread', 'the cheese', 'the butter']
    }
  },
  // Verbs
  {
    id: 'v1',
    category: 'verbs',
    spanish: 'correr',
    english: 'to run',
    quiz: {
      type: 'multiple-choice',
      options: ['to walk', 'to run', 'to jump', 'to sleep']
    }
  },
  {
    id: 'v2',
    category: 'verbs',
    spanish: 'comer',
    english: 'to eat',
    quiz: {
      type: 'multiple-choice',
      options: ['to drink', 'to eat', 'to sleep', 'to read']
    }
  },
  {
    id: 'v3',
    category: 'verbs',
    spanish: 'dormir',
    english: 'to sleep',
    quiz: {
      type: 'multiple-choice',
      options: ['to run', 'to play', 'to sleep', 'to eat']
    }
  }
];
