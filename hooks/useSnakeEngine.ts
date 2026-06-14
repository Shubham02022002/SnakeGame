import { useEffect, useRef, useState } from "react";
import { Coordinate, Direction, GameState } from "../types/types";

const SPEED = 100;

export function useSnakeEngine(gridX: number, gridY: number) {
  const getInitialSnake = (): Coordinate[] => [
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 },
  ];

  const [snake, setSnake] = useState<Coordinate[]>(getInitialSnake());
  const [food, setFood] = useState<Coordinate>({ x: 8, y: 8 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [status, setStatus] = useState<GameState>("idle");

  const directionRef = useRef<Direction>(Direction.Right);
  const nextDirection = useRef<Direction>(Direction.Right);

  const generateRandomFood = (currentSnake: Coordinate[]): Coordinate => {
    while (true) {
      const newFood = {
        x: Math.floor(Math.random() * gridX),
        y: Math.floor(Math.random() * gridY),
      };
      const conflicts = currentSnake.some(
        (s) => s.x === newFood.x && s.y === newFood.y,
      );
      if (!conflicts) return newFood;
    }
  };

  const handleSwipe = (translationX: number, translationY: number) => {
    if (status !== "running") return;
    const minSwipeDistance = 25;

    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (Math.abs(translationX) > minSwipeDistance) {
        if (translationX > 0 && directionRef.current !== Direction.Left)
          nextDirection.current = Direction.Right;
        else if (translationX < 0 && directionRef.current !== Direction.Right)
          nextDirection.current = Direction.Left;
      }
    } else {
      if (Math.abs(translationY) > minSwipeDistance) {
        if (translationY > 0 && directionRef.current !== Direction.Up)
          nextDirection.current = Direction.Down;
        else if (translationY < 0 && directionRef.current !== Direction.Down)
          nextDirection.current = Direction.Up;
      }
    }
  };

  useEffect(() => {
    if (status !== "running") return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        directionRef.current = nextDirection.current;
        const head = prevSnake[0];
        if (!head) return prevSnake;

        const newHead = { ...head };
        switch (directionRef.current) {
          case Direction.Right:
            newHead.x += 1;
            break;
          case Direction.Left:
            newHead.x -= 1;
            break;
          case Direction.Up:
            newHead.y -= 1;
            break;
          case Direction.Down:
            newHead.y += 1;
            break;
        }

        if (
          newHead.x < 0 ||
          newHead.y < 0 ||
          newHead.x >= gridX ||
          newHead.y >= gridY
        ) {
          setStatus("gameover");
          return prevSnake;
        }

        const bodyCollision = prevSnake
          .slice(0, -1)
          .some(
            (segment) => segment.x === newHead.x && segment.y === newHead.y,
          );
        if (bodyCollision) {
          setStatus("gameover");
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];
        let ateFood = false;

        setFood((currentFood) => {
          if (newHead.x === currentFood.x && newHead.y === currentFood.y) {
            ateFood = true;
            setScore((s) => {
              const nextScore = s + 10;
              if (nextScore > highScore) setHighScore(nextScore);
              return nextScore;
            });
            return generateRandomFood(newSnake);
          }
          return currentFood;
        });

        if (!ateFood) newSnake.pop();
        return newSnake;
      });
    }, SPEED);

    return () => clearInterval(interval);
  }, [status, highScore, gridX, gridY]);

  const restart = () => {
    directionRef.current = Direction.Right;
    nextDirection.current = Direction.Right;
    setSnake(getInitialSnake());
    setFood({ x: Math.floor(gridX / 2), y: Math.floor(gridY / 2) });
    setScore(0);
    setStatus("running");
  };

  const togglePause = () => {
    if (status === "running") setStatus("paused");
    else if (status === "paused") setStatus("running");
  };

  return {
    snake,
    food,
    score,
    highScore,
    status,
    handleSwipe,
    restart,
    togglePause,
  };
}
