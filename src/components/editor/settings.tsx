// 싫제 사용시 코드 수정 필요함
export default function useSettings() {
  // OpenAI API keys
  const openai = "sk-proj-1234567890";

  // OpenAI model
  const model = "gpt-4o";

  return {
    keys: {
      openai,
    },
    model: {
      value: model,
    },
  };
}
