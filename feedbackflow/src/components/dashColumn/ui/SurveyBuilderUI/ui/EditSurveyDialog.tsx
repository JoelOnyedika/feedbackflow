"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRecoilValue, useRecoilState } from "recoil";
import { lessThanFiveStarQuestionListSelector } from '@/lib/recoil/selectors';
import { questionListState } from '@/lib/recoil/atoms';
import { X } from 'lucide-react';

export default function EditSurveyDialog({ canAddOption, questionId }) {
  const [name, setName] = useState("");
  const [questionState, setQuestionState] = useRecoilState(questionListState);
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState("");

  const addOption = () => {
    if (newOption.trim() !== "") {
      setOptions([...options, newOption.trim()]);
      setNewOption("");
    }
  };

  const removeOption = (option) => {
    setOptions(options.filter((opt) => opt !== option));
  };

  const questionList = useRecoilValue(lessThanFiveStarQuestionListSelector);

  useEffect(() => {
    const filteredQuestion = questionList.find((ques) => ques.id === questionId);
    if (filteredQuestion) {
      setName(filteredQuestion.question);
      setOptions(filteredQuestion.options || []);
    }
  }, [questionId, questionList]);

  const handleSave = () => {
    const updatedQuestions = questionState.map((ques) =>
      ques.id === questionId ? { ...ques, question: name, options: options } : ques
    );
    setQuestionState(updatedQuestions);

    const updatedQuestion = updatedQuestions.find((ques) => ques.id === questionId);
    // Log the updated question
    console.log("Question after update:", updatedQuestion);
  };

  return (
    <div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit a Question</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Question</Label>
            <Input
              id="title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter a question"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="options">Add Options</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="options"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="Add an option"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addOption();
                  }
                }}
              />
              <Button onClick={addOption}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {options.map((option, index) => (
                <div
                  key={index}
                  className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full flex items-center space-x-2"
                >
                  <span>{option}</span>
                  <Button variant="ghost" size="icon" onClick={() => removeOption(option)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save</Button>
          <DialogClose asChild>
            <Button variant="destructive">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </div>
  );
}