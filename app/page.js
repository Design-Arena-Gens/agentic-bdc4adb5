'use client';

import { useState, useEffect } from 'react';

export default function WorkoutTrainer() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRest, setIsRest] = useState(false);
  const [completed, setCompleted] = useState(false);

  const workout = [
    { name: "Goblet Squats", duration: 45, rest: 15, reps: "12-15", muscles: "Legs, Core" },
    { name: "Dumbbell Push Press", duration: 45, rest: 15, reps: "10-12", muscles: "Shoulders, Triceps" },
    { name: "Bent Over Rows", duration: 45, rest: 15, reps: "12-15", muscles: "Back, Biceps" },
    { name: "Romanian Deadlifts", duration: 45, rest: 15, reps: "12-15", muscles: "Hamstrings, Glutes" },
    { name: "Dumbbell Floor Press", duration: 45, rest: 15, reps: "12-15", muscles: "Chest, Triceps" },
    { name: "Dumbbell Lunges", duration: 45, rest: 15, reps: "10-12 each", muscles: "Legs, Glutes" },
    { name: "Hammer Curls", duration: 30, rest: 15, reps: "12-15", muscles: "Biceps, Forearms" },
    { name: "Overhead Tricep Extension", duration: 30, rest: 15, reps: "12-15", muscles: "Triceps" },
    { name: "Russian Twists", duration: 45, rest: 15, reps: "20-30", muscles: "Core, Obliques" },
    { name: "Dumbbell Shoulder Shrugs", duration: 30, rest: 0, reps: "15-20", muscles: "Traps" }
  ];

  useEffect(() => {
    let interval = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      if (isRest) {
        setIsRest(false);
        if (currentExercise < workout.length - 1) {
          setCurrentExercise(curr => curr + 1);
          setTimeLeft(workout[currentExercise + 1].duration);
        } else {
          setIsActive(false);
          setCompleted(true);
        }
      } else {
        if (workout[currentExercise].rest > 0 && currentExercise < workout.length - 1) {
          setIsRest(true);
          setTimeLeft(workout[currentExercise].rest);
        } else if (currentExercise < workout.length - 1) {
          setCurrentExercise(curr => curr + 1);
          setTimeLeft(workout[currentExercise + 1].duration);
        } else {
          setIsActive(false);
          setCompleted(true);
        }
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, isRest, currentExercise]);

  const startWorkout = () => {
    setIsActive(true);
    setCurrentExercise(0);
    setTimeLeft(workout[0].duration);
    setIsRest(false);
    setCompleted(false);
  };

  const pauseWorkout = () => {
    setIsActive(false);
  };

  const resumeWorkout = () => {
    setIsActive(true);
  };

  const resetWorkout = () => {
    setIsActive(false);
    setCurrentExercise(0);
    setTimeLeft(0);
    setIsRest(false);
    setCompleted(false);
  };

  const skipExercise = () => {
    if (currentExercise < workout.length - 1) {
      setCurrentExercise(curr => curr + 1);
      setTimeLeft(workout[currentExercise + 1].duration);
      setIsRest(false);
    } else {
      setIsActive(false);
      setCompleted(true);
    }
  };

  const totalTime = workout.reduce((acc, ex) => acc + ex.duration + ex.rest, 0);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '10px',
          color: '#333'
        }}>
          15-Min Full Body Workout
        </h1>
        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '30px',
          fontSize: '14px'
        }}>
          5kg Dumbbells • Muscle Growth & Strength • Total: {Math.floor(totalTime / 60)}:{(totalTime % 60).toString().padStart(2, '0')}
        </p>

        {!isActive && !completed && (
          <div>
            <div style={{
              background: '#f8f9fa',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '20px'
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
                Workout Plan
              </h2>
              {workout.map((ex, idx) => (
                <div key={idx} style={{
                  padding: '12px',
                  marginBottom: '8px',
                  background: 'white',
                  borderRadius: '8px',
                  borderLeft: '4px solid #667eea'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: '600', color: '#333', marginBottom: '4px' }}>
                        {idx + 1}. {ex.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {ex.reps} reps • {ex.duration}s work {ex.rest > 0 && `• ${ex.rest}s rest`}
                      </div>
                      <div style={{ fontSize: '11px', color: '#667eea', marginTop: '2px' }}>
                        {ex.muscles}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              background: '#fff3cd',
              border: '1px solid #ffc107',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '20px',
              fontSize: '13px',
              color: '#856404'
            }}>
              <strong>💡 Quick Tips:</strong>
              <ul style={{ margin: '8px 0 0 20px', padding: 0 }}>
                <li>Perform exercises with controlled form</li>
                <li>Use both dumbbells together for compound moves</li>
                <li>Focus on time under tension, not speed</li>
                <li>Do this 3-5x per week for best results</li>
              </ul>
            </div>

            <button
              onClick={startWorkout}
              style={{
                width: '100%',
                padding: '18px',
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'white',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.02)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              Start Workout
            </button>
          </div>
        )}

        {isActive && (
          <div>
            <div style={{
              textAlign: 'center',
              marginBottom: '30px'
            }}>
              <div style={{
                fontSize: '14px',
                color: '#666',
                marginBottom: '10px'
              }}>
                Exercise {currentExercise + 1} of {workout.length}
              </div>

              <div style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: isRest ? '#ff6b6b' : '#667eea',
                marginBottom: '10px'
              }}>
                {isRest ? 'REST' : workout[currentExercise].name}
              </div>

              {!isRest && (
                <div>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                    Target: {workout[currentExercise].reps} reps
                  </div>
                  <div style={{ fontSize: '12px', color: '#999' }}>
                    {workout[currentExercise].muscles}
                  </div>
                </div>
              )}

              <div style={{
                fontSize: '72px',
                fontWeight: 'bold',
                color: timeLeft <= 5 ? '#ff6b6b' : '#333',
                margin: '30px 0'
              }}>
                {timeLeft}
              </div>

              <div style={{
                width: '100%',
                height: '8px',
                background: '#e9ecef',
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '20px'
              }}>
                <div style={{
                  height: '100%',
                  background: isRest ? '#ff6b6b' : '#667eea',
                  width: `${(timeLeft / (isRest ? workout[currentExercise].rest : workout[currentExercise].duration)) * 100}%`,
                  transition: 'width 1s linear'
                }}></div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={pauseWorkout}
                style={{
                  flex: 1,
                  padding: '15px',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'white',
                  background: '#6c757d',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
              >
                Pause
              </button>
              <button
                onClick={skipExercise}
                style={{
                  flex: 1,
                  padding: '15px',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'white',
                  background: '#ffc107',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
              >
                Skip
              </button>
              <button
                onClick={resetWorkout}
                style={{
                  flex: 1,
                  padding: '15px',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'white',
                  background: '#dc3545',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
              >
                Reset
              </button>
            </div>

            <div style={{
              marginTop: '20px',
              padding: '15px',
              background: '#f8f9fa',
              borderRadius: '10px',
              fontSize: '13px',
              color: '#666'
            }}>
              <strong>Next:</strong> {currentExercise < workout.length - 1 ? workout[currentExercise + 1].name : 'Workout Complete!'}
            </div>
          </div>
        )}

        {!isActive && timeLeft > 0 && (
          <div>
            <div style={{
              textAlign: 'center',
              marginBottom: '30px'
            }}>
              <div style={{
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#667eea',
                marginBottom: '10px'
              }}>
                Paused
              </div>
              <div style={{
                fontSize: '14px',
                color: '#666',
                marginBottom: '20px'
              }}>
                {workout[currentExercise].name} - {timeLeft}s remaining
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={resumeWorkout}
                style={{
                  flex: 1,
                  padding: '18px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: 'white',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer'
                }}
              >
                Resume
              </button>
              <button
                onClick={resetWorkout}
                style={{
                  flex: 1,
                  padding: '18px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: 'white',
                  background: '#dc3545',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer'
                }}
              >
                Reset
              </button>
            </div>
          </div>
        )}

        {completed && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎉</div>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea', marginBottom: '15px' }}>
              Workout Complete!
            </h2>
            <p style={{ fontSize: '16px', color: '#666', marginBottom: '30px' }}>
              Great job! You've completed your full body workout.
            </p>
            <button
              onClick={resetWorkout}
              style={{
                width: '100%',
                padding: '18px',
                fontSize: '18px',
                fontWeight: 'bold',
                color: 'white',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer'
              }}
            >
              Do Another Round
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
