/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { LearningProgress } from '../types';

const STORAGE_KEY = 'synapse_aiml_learning_progress_v1';

const defaultProgress: LearningProgress = {
  completedTopics: [],
  completedQuestions: [],
  quizScores: {},
  bookmarks: [],
  lastVisitedUnitId: 'unit-1',
  lastVisitedTab: 'overview'
};

export function useLearningProgress() {
  const [progress, setProgress] = useState<LearningProgress>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback to default
    }
    return defaultProgress;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore storage quota issues
    }
  }, [progress]);

  const toggleQuestionCompleted = (questionId: string) => {
    setProgress(prev => {
      const exists = prev.completedQuestions.includes(questionId);
      const updated = exists
        ? prev.completedQuestions.filter(id => id !== questionId)
        : [...prev.completedQuestions, questionId];
      return { ...prev, completedQuestions: updated };
    });
  };

  const toggleBookmark = (questionId: string) => {
    setProgress(prev => {
      const exists = prev.bookmarks.includes(questionId);
      const updated = exists
        ? prev.bookmarks.filter(id => id !== questionId)
        : [...prev.bookmarks, questionId];
      return { ...prev, bookmarks: updated };
    });
  };

  const saveQuizScore = (unitNumber: number, percentage: number) => {
    setProgress(prev => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [unitNumber]: percentage
      }
    }));
  };

  const markTopicCompleted = (topicId: string) => {
    setProgress(prev => {
      if (prev.completedTopics.includes(topicId)) return prev;
      return {
        ...prev,
        completedTopics: [...prev.completedTopics, topicId]
      };
    });
  };

  const setLastLocation = (unitId: string, tab: string) => {
    setProgress(prev => ({
      ...prev,
      lastVisitedUnitId: unitId,
      lastVisitedTab: tab
    }));
  };

  const resetAllProgress = () => {
    setProgress(defaultProgress);
  };

  return {
    progress,
    toggleQuestionCompleted,
    toggleBookmark,
    saveQuizScore,
    markTopicCompleted,
    setLastLocation,
    resetAllProgress
  };
}
