import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

// Spies functions -> will acuse if it is called
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    // fake repository, dont want to test it
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'I found a bug',
            screenshot: 'data:image/png;base6473t4734',
        })).resolves.not.toThrow(); // function should run all and not throw error 

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })

    it('should not be able submit feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'I found a bug',
            screenshot: 'data:image/png;base6473t4734',
        })).rejects.toThrow(); // function should be rejected and throw error
    })

    it('should not be able submit feedback without comment', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base6473t4734',
        })).rejects.toThrow(); // function should be rejected and throw error
    })

    it('should not be able submit feedback without an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'test.jpg',
        })).rejects.toThrow(); // function should be rejected and throw error
    })
})