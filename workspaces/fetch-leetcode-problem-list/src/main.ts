import { constants } from "node:fs";
import fsPromises from "node:fs/promises";
import process from "node:process";

import {
  getQuestionList,
  type QuestionListQuestion,
} from "@code-chronicles/leetcode-api";
import { sleep } from "@code-chronicles/util";

const FILENAME = "problems.jsonl";

async function main(): Promise<void> {
  // TODO: warn early if the file already exists

  let totalCount: number | null = null;
  const problemsMap = new Map<number, QuestionListQuestion>();
  let skip = 0;

  while (problemsMap.size !== totalCount) {
    if (totalCount != null) {
      console.error("Sleeping...");
      // eslint-disable-next-line no-await-in-loop
      await sleep(5000);
    }

    console.error("Fetching...");
    // eslint-disable-next-line no-await-in-loop
    const data = await getQuestionList({
      skip,
      limit: 500,
    });
    totalCount = data.totalNum;

    for (const question of data.questions) {
      problemsMap.set(question.questionFrontendId, question);
    }

    if (data.questions.length === 0) {
      console.error("Experienced a pagination error, resetting offset.");
      skip = 0;
    } else {
      skip += data.questions.length;
    }

    console.error(
      `Fetched data on ${[problemsMap.size]} / ${totalCount} problems so far.`,
    );
  }

  const problems = [...problemsMap.values()].sort(
    (a, b) => a.questionFrontendId - b.questionFrontendId,
  );

  await fsPromises.writeFile(
    FILENAME,
    problems.map((p) => JSON.stringify(p) + "\n"),
    { flag: constants.O_CREAT | constants.O_RDWR | constants.O_EXCL },
  );

  console.error(`Wrote data to: ${FILENAME}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
