export class UserAnswer {
    coding_problem_id: string;
    language_id: number;
    coding_problem_answer: string;
    ctrl_v_count: number = 0;
    page_leave_count: number = 0;
    run_test_count: number = 0;
    is_question_shown: Boolean = false;
    is_question_copied: Boolean = false;
}