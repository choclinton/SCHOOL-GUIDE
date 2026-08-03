// Central lesson registry — maps blueprint IDs to their lessons
import { webLessons } from './webLessons.js';
import { webLessonsExtended } from './webLessonsModule3.js';
import { mobileLessons } from './mobileLessons.js';
import { cyberLessons } from './cyberLessons.js';
import { dataAiLessons } from './dataAiLessons.js';
import { devopsLessons } from './devopsLessons.js';

// Merge web lesson files
const allWebLessons = [...(webLessons || []), ...(webLessonsExtended || [])];

/**
 * Returns all lessons for a given blueprint ID
 * Blueprint IDs correspond to the IDs in mockData.js
 */
export function getLessonsForBlueprint(blueprintId) {
  const map = {
    'web-dev': allWebLessons,
    'mobile-dev': mobileLessons,
    'cybersecurity': cyberLessons,
    'data-ai': dataAiLessons,
    'devops': devopsLessons,
  };
  return map[blueprintId] || [];
}

/**
 * Returns a single lesson by blueprint ID and lesson ID
 */
export function getLesson(blueprintId, lessonId) {
  const lessons = getLessonsForBlueprint(blueprintId);
  return lessons.find(l => l.id === parseInt(lessonId)) || null;
}

/**
 * Returns lessons grouped by module name
 */
export function getLessonsByModule(blueprintId) {
  const lessons = getLessonsForBlueprint(blueprintId);
  const grouped = {};
  lessons.forEach(lesson => {
    if (!grouped[lesson.module]) {
      grouped[lesson.module] = [];
    }
    grouped[lesson.module].push(lesson);
  });
  return grouped;
}

/**
 * Returns total number of lessons for a blueprint
 */
export function getLessonCount(blueprintId) {
  return getLessonsForBlueprint(blueprintId).length;
}

/**
 * Checks how many lessons a user has completed (quiz passed)
 * based on localStorage quiz results
 */
export function getCompletedLessons(blueprintId) {
  const lessons = getLessonsForBlueprint(blueprintId);
  return lessons.filter(lesson => {
    const stored = localStorage.getItem(`quiz_${blueprintId}_${lesson.id}`);
    if (!stored) return false;
    try {
      const { passed } = JSON.parse(stored);
      return passed === true;
    } catch {
      return false;
    }
  }).map(l => l.id);
}

/**
 * Returns completion percentage for a blueprint
 */
export function getBlueprintProgress(blueprintId) {
  const total = getLessonCount(blueprintId);
  if (total === 0) return 0;
  const completed = getCompletedLessons(blueprintId).length;
  return Math.round((completed / total) * 100);
}
