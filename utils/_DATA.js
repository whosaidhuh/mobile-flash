export const decks = {
    MLVocabA: {
      title: 'ML Vocab A',
      cards: [
        {
          question: 'A statistical way of comparing two (or more) techniques, typically an incumbent against a new rival. A/B testing aims to determine not only which technique performs better but also to understand whether the difference is statistically significant. A/B testing usually considers only two techniques using one measurement, but it can be applied to any finite number of techniques and measures.',
          answer: 'A/B testing'
        },
        {
          question: 'The fraction of predictions that a classification model got right. In multi-class classification, accuracy is defined as follows:\n' +
              '\n' +
              'In binary classification, accuracy has the following definition:\n' +
              '\n' +
              'See true positive and true negative.',
          answer: 'Accuracy'
        },
        {
            question: `In reinforcement learning, the mechanism by which the agent transitions between states of the environment. The agent chooses the action by using a policy.`,
            answer: 'action'
          },
          {
            question: `A function (for example, ReLU or sigmoid) that takes in the weighted sum of all of the inputs from the previous layer and then generates and passes an output value (typically nonlinear) to the next layer.`,
            answer: 'Activation Function'
          },
      ]
    },
    MLVocabB: {
      title: 'ML Vocab B',
      cards: [
        {
          question: 'An NxN table that summarizes how successful a classification model\'s predictions were; that is, the correlation between the label and the model\'s classification. One axis of a confusion matrix is the label that the model predicted, and the other axis is the actual label. N represents the number of classes. In a binary classification problem, N=2. For example, here is a sample confusion matrix for a binary classification problem:\n' +
              '\n' +
              'Tumor (predicted)        Non-Tumor (predicted)\n' +
              'Tumor (actual)        18        1\n' +
              'Non-Tumor (actual)        6        452\n' +
              'The preceding confusion matrix shows that of the 19 samples that actually had tumors, the model correctly classified 18 as having tumors (18 true positives), and incorrectly classified 1 as not having a tumor (1 false negative). Similarly, of 458 samples that actually did not have tumors, 452 were correctly classified (452 true negatives) and 6 were incorrectly classified (6 false positives).\n' +
              '\n' +
              'The confusion matrix for a multi-class classification problem can help you determine mistake patterns. For example, a confusion matrix could reveal that a model trained to recognize handwritten digits tends to mistakenly predict 9 instead of 4, or 1 instead of 7.\n' +
              '\n' +
              'Confusion matrices contain sufficient information to calculate a variety of performance metrics, including precision and recall.\n' +
              '\n',
          answer:
            `Confusion Matrix`
        },
        {
            question: 'The tendency to search for, interpret, favor, and recall information in a way that confirms one\'s preexisting beliefs or hypotheses. Machine learning developers may inadvertently collect or label data in ways that influence an outcome supporting their existing beliefs. Confirmation bias is a form of implicit bias.\n' +
                '\n' +
                'Experimenter\'s bias is a form of confirmation bias in which an experimenter continues training models until a preexisting hypothesis is confirmed.',
            answer:
              'confirmation bias'
          },
          {
            question: 'Informally, often refers to a state reached during training in which training loss and validation loss change very little or not at all with each iteration after a certain number of iterations. In other words, a model reaches convergence when additional training on the current data will not improve the model. In deep learning, loss values sometimes stay constant or nearly so for many iterations before finally descending, temporarily producing a false sense of convergence.\n' +
                '\n' +
                'See also early stopping.\n' +
                '\n' +
                'See also Boyd and Vandenberghe, Convex Optimization.\n' +
                '\n',
            answer:
            'Convergence'
          }
      ]
    },
  };
