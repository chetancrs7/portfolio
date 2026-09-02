import type { CaseStudyDetail } from "./types";

export const caseStudyDetails = [
  {
    slug: "hybrid-sentiment-intelligence-system",
    template: "project",
    role: "Backend / AI Engineer",
    sections: [
      {
        id: "overview",
        paragraphs: [
          "This system frames sentiment inference as a backend-ready AI pipeline rather than a single notebook result. It combines semantic representations with structural linguistic features, then learns how much to trust each side through a fusion layer.",
          "The work is positioned around model comparison, calibration, and service boundaries: what should happen synchronously, what can be evaluated offline, and how the model should report uncertainty to downstream consumers.",
        ],
      },
      {
        id: "problem",
        paragraphs: [
          "Pure lexical models can miss context, while transformer models can be overconfident on short, sarcastic, or structurally unusual text. The engineering problem is to improve quality without hiding the operational behavior of the model behind a black-box endpoint.",
        ],
      },
      {
        id: "constraints",
        constraints: [
          "ML inference should not block unrelated user-facing requests.",
          "Evaluation metrics must distinguish accuracy from calibration and ranking quality.",
          "The model boundary should expose confidence and provenance so downstream services can apply policy.",
        ],
      },
      {
        id: "architecture",
        architecture: {
          title: "Hybrid Inference Boundary",
          description:
            "A semantic encoder and structural feature pipeline produce independent signals before a learned fusion layer emits the final sentiment distribution.",
          nodes: [
            "Text Input",
            "Semantic Encoder",
            "Structural Features",
            "Fusion Gate",
            "Sentiment Output",
          ],
          caption:
            "Temporary architecture view; Mermaid and richer diagrams are intentionally deferred.",
        },
      },
      {
        id: "data-flow",
        dataFlow: {
          steps: [
            "Request",
            "Validation",
            "Preprocessing",
            "Feature Extraction",
            "Fusion Model",
            "Prediction",
          ],
          caption:
            "The serving path keeps request validation separate from model execution so the boundary can move to a worker later.",
        },
      },
      {
        id: "backend-design",
        paragraphs: [
          "The backend interface should treat inference as an explicit capability with input validation, request identifiers, versioned model metadata, and structured output. That keeps application code from depending on model internals.",
          "The synchronous endpoint is suitable for small interactive requests. Larger batch inference should move to an asynchronous worker path with stored results and retry-safe job identifiers.",
        ],
      },
      {
        id: "database-design",
        databaseTables: [
          {
            name: "inference_requests",
            columns: [
              "id",
              "request_hash",
              "model_version",
              "status",
              "created_at",
              "completed_at",
            ],
            indexes: [
              {
                columns: "(request_hash, model_version)",
                reason:
                  "Supports deterministic lookup of repeated inference requests without coupling callers to storage details.",
              },
            ],
          },
          {
            name: "sentiment_predictions",
            columns: [
              "id",
              "request_id",
              "label",
              "confidence",
              "gate_alpha",
              "created_at",
            ],
            indexes: [
              {
                columns: "(request_id)",
                reason:
                  "Keeps prediction retrieval attached to the request lifecycle.",
              },
            ],
          },
        ],
      },
      {
        id: "api-design",
        apiEndpoints: [
          {
            method: "POST",
            path: "/v1/sentiment/inference",
            description:
              "Validate input text and return a versioned sentiment prediction.",
          },
          {
            method: "GET",
            path: "/v1/sentiment/inference/{id}",
            description:
              "Retrieve an inference result by stable request identifier.",
          },
          {
            method: "POST",
            path: "/v1/sentiment/batches",
            description:
              "Create an asynchronous batch inference job for larger workloads.",
          },
        ],
      },
      {
        id: "ai-architecture",
        paragraphs: [
          "The model combines DeBERTa semantic representations with structural features produced for XGBoost-style classification. The fusion layer learns a gate alpha that controls how strongly the semantic side contributes to the final prediction.",
          "Mean gate alpha is tracked because it describes model behavior, not just the final score. A high alpha suggests the semantic model carries most of the signal while structural features remain available for edge cases.",
        ],
      },
      {
        id: "evaluation",
        benchmark: {
          columns: ["Model", "Accuracy", "Macro F1", "Notes"],
          highlightRow: "Fusion",
          rows: [
            {
              Model: "XGBoost",
              Accuracy: "0.743",
              "Macro F1": "0.742",
              Notes: "Structural baseline",
            },
            {
              Model: "KAN",
              Accuracy: "0.8724",
              "Macro F1": "0.872",
              Notes: "Neural baseline",
            },
            {
              Model: "Fusion",
              Accuracy: "0.8741",
              "Macro F1": "0.874",
              Notes: "Hybrid gated model",
            },
          ],
          caption:
            "Known project metrics from the current portfolio context; no extra benchmark values are inferred.",
        },
      },
      {
        id: "performance",
        paragraphs: [
          "The current evidence is model-quality oriented. Service latency, throughput, and batch processing benchmarks should be measured once the serving path is implemented behind a stable API boundary.",
        ],
      },
      {
        id: "reliability",
        failureModes: [
          {
            title: "Model Timeout",
            failure:
              "The inference worker exceeds the request budget for unusually long input.",
            behavior:
              "The API returns a bounded error rather than leaving the caller waiting indefinitely.",
            protection:
              "Request timeouts, max input lengths, and a future asynchronous batch path protect user-facing flows.",
          },
          {
            title: "Duplicate Request",
            failure:
              "A client retries after losing the response from a completed inference.",
            behavior:
              "The same request hash and model version can resolve to the existing prediction.",
            protection:
              "Idempotent request keys avoid duplicate database effects and make retries predictable.",
          },
        ],
      },
      {
        id: "security",
        paragraphs: [
          "The serving boundary should validate input size, reject malformed payloads, avoid logging raw sensitive text by default, and expose model metadata without leaking training artifacts.",
        ],
      },
      {
        id: "deployment",
        paragraphs: [
          "The deployment design should separate the application API from the model runtime so CPU-bound or GPU-bound inference can scale independently when real traffic data justifies it.",
        ],
      },
      {
        id: "observability",
        bullets: [
          "Track request volume, latency buckets, timeout rate, and model version.",
          "Record confidence and calibration-oriented aggregate metrics without storing unnecessary raw text.",
          "Separate application failures from model-quality drift.",
        ],
      },
      {
        id: "decisions",
        decisions: [
          {
            id: "ADR-001",
            title: "Use a fusion boundary instead of choosing one model family",
            context:
              "Semantic and structural features carry different signals, and the project goal is to evaluate how they complement each other.",
            options: [
              "Use only transformer embeddings",
              "Use only structural features",
              "Learn a fusion layer across both signals",
            ],
            decision:
              "Use a learned fusion mechanism and report quality metrics alongside gate behavior.",
            tradeoffs: [
              "The hybrid design is more complex to explain and serve.",
              "It creates a clearer evaluation story for feature contribution and calibration.",
            ],
          },
        ],
      },
      {
        id: "limitations",
        limitations: [
          "Production latency and throughput have not been measured yet.",
          "The current results should be interpreted within the known evaluation setup, not generalized to every sentiment domain.",
          "Calibration and error analysis need deeper slices before deployment claims would be credible.",
        ],
      },
      {
        id: "lessons",
        paragraphs: [
          "If redesigning this system today, I would separate embedding generation from synchronous request handling earlier and make model evaluation artifacts first-class outputs of the pipeline.",
        ],
      },
    ],
  },
  {
    slug: "semantic-structural-sentiment-fusion",
    template: "research",
    role: "AI / ML Research",
    sections: [
      {
        id: "research-problem",
        paragraphs: [
          "The research question is whether semantic representations and structural sentiment features produce complementary signal, and whether a gated fusion approach improves classification without masking calibration risk.",
        ],
      },
      {
        id: "hypothesis",
        paragraphs: [
          "A fusion model should perform slightly better than either feature family alone when the gate learns when contextual semantics dominate and when structural signals help resolve ambiguity.",
        ],
      },
      {
        id: "dataset",
        bullets: [
          "English text sentiment classification setting.",
          "Class imbalance and sarcasm-like cases require explicit error analysis.",
          "Full dataset card remains deferred to the future MDX content branch.",
        ],
      },
      {
        id: "baselines",
        benchmark: {
          columns: ["Model", "Accuracy", "Macro F1"],
          highlightRow: "Fusion",
          rows: [
            { Model: "XGBoost", Accuracy: "0.743", "Macro F1": "0.742" },
            { Model: "KAN", Accuracy: "0.8724", "Macro F1": "0.872" },
            { Model: "Fusion", Accuracy: "0.8741", "Macro F1": "0.874" },
          ],
        },
      },
      {
        id: "methodology",
        paragraphs: [
          "Compare classical structural features, neural representations, and the combined model under the same evaluation framing. The goal is not only to maximize score, but to understand confidence, gate behavior, and failure modes.",
        ],
      },
      {
        id: "model-architecture",
        architecture: {
          title: "Semantic + Structural Fusion",
          description:
            "Two feature paths feed a gated fusion stage before classification.",
          nodes: [
            "Text",
            "DeBERTa Features",
            "Structural Features",
            "Gate Alpha",
            "Classifier",
          ],
        },
      },
      {
        id: "evaluation-metrics",
        bullets: [
          "Accuracy: overall classification correctness.",
          "Macro F1: class-balanced performance signal.",
          "AUC: ranking quality across thresholds.",
          "ECE: calibration error for confidence quality.",
        ],
      },
      {
        id: "results",
        benchmark: {
          columns: ["Metric", "Value", "Meaning"],
          rows: [
            {
              Metric: "Test Accuracy",
              Value: "0.8741",
              Meaning: "Final fusion model classification accuracy",
            },
            {
              Metric: "Macro F1",
              Value: "0.874",
              Meaning: "Class-balanced F1 score",
            },
            {
              Metric: "AUC",
              Value: "0.947",
              Meaning: "Ranking quality across decision thresholds",
            },
            {
              Metric: "ECE",
              Value: "0.0065",
              Meaning: "Expected calibration error",
            },
            {
              Metric: "Mean Gate Alpha",
              Value: "0.924",
              Meaning: "Average learned semantic contribution",
            },
            {
              Metric: "Oracle Accuracy",
              Value: "0.923",
              Meaning: "Upper-bound comparison from known context",
            },
          ],
        },
      },
      {
        id: "error-analysis",
        errorAnalyses: [
          {
            type: "Sarcastic negative text",
            observation:
              "The semantic model can remain confident when literal wording conflicts with intent.",
            likelyCause:
              "Contextual intent is underrepresented by surface-level sentiment cues.",
            possibleImprovement:
              "Add targeted sarcasm features or evaluate calibrated routing for uncertain cases.",
          },
        ],
      },
      {
        id: "inference-performance",
        paragraphs: [
          "Computational performance should be measured separately from research quality. The next implementation step is to benchmark feature extraction and model inference under a realistic backend serving path.",
        ],
      },
      {
        id: "limitations",
        limitations: [
          "Dataset details and split methodology need fuller documentation.",
          "The current summary does not prove robustness across domains or languages.",
          "Operational serving performance is not yet measured.",
        ],
      },
      {
        id: "conclusion",
        paragraphs: [
          "The fusion result is modestly stronger than the listed baselines, but the bigger engineering value is the explicit evaluation surface: model quality, calibration, gate behavior, and known failure categories can all be discussed separately.",
        ],
      },
      {
        id: "next-experiments",
        bullets: [
          "Add richer error slices for sarcasm, negation, and short-form ambiguity.",
          "Benchmark the serving path once inference is behind a stable API.",
          "Document dataset provenance and limitations in MDX.",
        ],
      },
    ],
  },
  {
    slug: "distributed-notification-architecture",
    template: "system-design",
    role: "Backend System Designer",
    sections: [
      {
        id: "problem",
        paragraphs: [
          "Notification systems fail in ways that are easy to hide during happy-path demos: duplicate sends, delayed workers, provider outages, queue overload, and unclear delivery state. This design study models those failures directly.",
        ],
      },
      {
        id: "functional-requirements",
        constraints: [
          "Accept notification requests from internal product services.",
          "Fan out to channel-specific delivery workers.",
          "Track delivery attempts and final state per recipient.",
        ],
      },
      {
        id: "non-functional-requirements",
        constraints: [
          "Duplicate incoming events must not create duplicate sends.",
          "Provider failures should degrade one channel without stopping the whole pipeline.",
          "Operators need enough state to inspect retries and dead-lettered events.",
        ],
      },
      {
        id: "scale-assumptions",
        paragraphs: [
          "Scale assumptions are explicitly part of this architecture exercise, not measured production facts.",
        ],
        bullets: [
          "Traffic arrives in bursts around product events.",
          "Delivery fan-out is higher than request volume.",
          "Queue depth and retry windows are tuned from stated assumptions.",
        ],
      },
      {
        id: "capacity-estimates",
        paragraphs: [
          "The first capacity model should size queues and workers around peak fan-out, provider rate limits, and retry amplification. Concrete numerical estimates are intentionally deferred until the assumptions are finalized.",
        ],
      },
      {
        id: "api-design",
        apiEndpoints: [
          {
            method: "POST",
            path: "/v1/notifications",
            description:
              "Create a notification intent with an idempotency key.",
          },
          {
            method: "GET",
            path: "/v1/notifications/{id}",
            description:
              "Inspect normalized notification state and channel attempts.",
          },
          {
            method: "POST",
            path: "/v1/notifications/{id}/cancel",
            description:
              "Cancel work that has not yet been handed to a provider.",
          },
        ],
      },
      {
        id: "data-model",
        databaseTables: [
          {
            name: "notification_intents",
            columns: [
              "id",
              "idempotency_key",
              "recipient_id",
              "template",
              "status",
              "created_at",
            ],
            indexes: [
              {
                columns: "(idempotency_key)",
                reason:
                  "Prevents duplicate upstream events from creating duplicate notification intents.",
              },
            ],
          },
          {
            name: "delivery_attempts",
            columns: [
              "id",
              "notification_id",
              "channel",
              "provider",
              "attempt_count",
              "status",
              "last_error",
            ],
            indexes: [
              {
                columns: "(notification_id, channel)",
                reason:
                  "Supports operator inspection by notification and delivery channel.",
              },
            ],
          },
        ],
      },
      {
        id: "high-level-architecture",
        architecture: {
          title: "Asynchronous Notification Pipeline",
          description:
            "The API records notification intent, publishes work to a queue, and lets channel workers handle provider-specific delivery and retries.",
          nodes: [
            "Product Service",
            "Notification API",
            "Queue",
            "Channel Worker",
            "Provider",
          ],
          caption:
            "Architecture diagram is intentionally simple until Mermaid support exists.",
        },
      },
      {
        id: "component-deep-dives",
        paragraphs: [
          "The API owns validation and idempotent intent creation. Workers own provider translation, retry behavior, and attempt recording. The queue boundary prevents provider latency from blocking product services.",
        ],
      },
      {
        id: "data-flow",
        dataFlow: {
          steps: [
            "Intent",
            "Idempotency Check",
            "Persist",
            "Publish",
            "Deliver",
            "Record Attempt",
          ],
        },
      },
      {
        id: "reliability",
        failureModes: [
          {
            title: "Worker Crash",
            failure:
              "A worker terminates after sending to the provider but before acknowledging queue work.",
            behavior: "The message can be redelivered and processed again.",
            protection:
              "Attempt records and idempotency keys make duplicate side effects visible and bounded.",
          },
          {
            title: "Provider Outage",
            failure:
              "A downstream provider rejects requests or times out for one channel.",
            behavior:
              "That channel retries with backoff while other channels continue processing.",
            protection:
              "Channel isolation, retry budgets, and dead-letter queues prevent infinite retry loops.",
          },
        ],
      },
      {
        id: "scaling-strategy",
        paragraphs: [
          "Scale horizontally at the worker layer first, then split queues by channel or priority when one delivery mode starts starving another. Provider rate limits remain the real ceiling.",
        ],
      },
      {
        id: "observability",
        bullets: [
          "Queue depth and oldest-message age.",
          "Provider success, timeout, and rejection rates.",
          "Dead-letter count by template, channel, and provider.",
        ],
      },
      {
        id: "security",
        paragraphs: [
          "Notification payloads should minimize sensitive fields, use scoped service credentials, and avoid logging full message bodies unless an explicit debugging path is enabled.",
        ],
      },
      {
        id: "tradeoffs",
        tradeoffs: [
          {
            label: "Queue-backed delivery",
            status: "Selected",
            notes: [
              "Protects product services from provider latency.",
              "Adds eventual consistency and operational queue ownership.",
            ],
          },
          {
            label: "Direct provider calls",
            status: "Rejected for this case",
            notes: [
              "Simpler to implement initially.",
              "Weaker fit for retries, burst handling, and provider isolation.",
            ],
          },
        ],
      },
      {
        id: "alternative-designs",
        decisions: [
          {
            id: "ADR-001",
            title: "Persist intent before publishing work",
            context:
              "The system needs a durable source of truth before asynchronous delivery begins.",
            decision:
              "Write the notification intent transactionally before publishing delivery work.",
            tradeoffs: [
              "This creates a recovery problem if publish fails after persistence.",
              "An outbox pattern can close that gap in a later iteration.",
            ],
          },
        ],
      },
      {
        id: "limitations",
        limitations: [
          "This is a design study based on assumptions, not a production deployment.",
          "Capacity estimates remain qualitative until scale numbers are fixed.",
          "Exactly-once delivery is not claimed; the design targets bounded, observable retries.",
        ],
      },
    ],
  },
] satisfies CaseStudyDetail[];
