import { Document, Schema, model } from "mongoose";
import { ObjectId } from "mongodb";
import { ModelNames } from "./models.names";

// Types for document permissions
export enum DocumentPermission {
  READ = "READ",
  WRITE = "WRITE",
  ADMIN = "ADMIN",
}

// Types for document sharing
interface SharedUser {
  userID: ObjectId;
  permission: DocumentPermission;
  addedAt: Date;
  addedBy: ObjectId;
}

// Types for version control
interface DocumentVersion {
  content: any;
  updatedAt: Date;
  updatedBy: ObjectId;
  versionNumber: number;
}

// Types for cursor and presence
interface UserPresence {
  userID: ObjectId;
  lastActive: Date;
  cursor?: {
    index: number;
    length: number;
  };
  color?: string; 
  selection?: {
    ranges: Array<{ index: number; length: number }>;
  };
}

// Define interface for instance methods
// interface IDocumentMethods {
//   canUserEdit(userID: ObjectId): boolean;
//   addCollaborator(
//     userID: ObjectId,
//     permission: DocumentPermission,
//     addedBy: ObjectId
//   ): void;
//   updateVersion(content: any, updatedBy: ObjectId): void;
// }

// Define the main document interface extending both Document and IDocumentMethods
export class Documents extends Document {
  documentID: string;
  name: string;
  data: {
    content: any;
    type: string;
    encoding?: string;
  };
  author: {
    userID: ObjectId;
    createdAt: Date;
  };
  collaborators: SharedUser[];
  activeUsers: UserPresence[];
  versions: DocumentVersion[];
  metadata: {
    lastModified: Date;
    lastModifiedBy: ObjectId;
    size: number;
    isArchived: boolean;
    tags?: string[];
    description?: string;
  };
  settings: {
    isPublic: boolean;
    allowComments: boolean;
    versioningEnabled: boolean;
    maxVersions?: number;
  };
  // Include the methods
  // canUserEdit(userID: ObjectId): boolean;
  // addCollaborator(
  //   userID: ObjectId,
  //   permission: DocumentPermission,
  //   addedBy: ObjectId
  // ): void;
  // updateVersion(content: any, updatedBy: ObjectId): void;
}

const DocumentsSchema = new Schema<Documents>(
  {
    documentID: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    data: {
      content: { type: Schema.Types.Mixed, required: true },
      type: { type: String, required: true, default: "rich-text" },
      encoding: { type: String },
    },
    author: {
      userID: {
        type: Schema.Types.ObjectId,
        ref: ModelNames.USER,
        required: true,
        index: true,
      },
      createdAt: { type: Date, required: true, default: Date.now },
    },
    collaborators: [
      {
        userID: {
          type: Schema.Types.ObjectId,
          ref: ModelNames.USER,
          required: true,
        },
        permission: {
          type: String,
          enum: Object.values(DocumentPermission),
          required: true,
        },
        addedAt: { type: Date, default: Date.now },
        addedBy: {
          type: Schema.Types.ObjectId,
          ref: ModelNames.USER,
          required: true,
        },
      },
    ],
    activeUsers: [
      {
        userID: {
          type: Schema.Types.ObjectId,
          ref: ModelNames.USER,
        },
        lastActive: { type: Date, default: Date.now },
        cursor: {
          index: Number,
          length: Number,
        },
        color: { type: String },
        selection: {
          ranges: [
            {
              index: Number,
              length: Number,
            },
          ],
        },
      },
    ],
    versions: [
      {
        content: Schema.Types.Mixed,
        updatedAt: { type: Date, default: Date.now },
        updatedBy: {
          type: Schema.Types.ObjectId,
          ref: ModelNames.USER,
        },
        versionNumber: { type: Number, required: true },
      },
    ],
    metadata: {
      lastModified: { type: Date, default: Date.now },
      lastModifiedBy: {
        type: Schema.Types.ObjectId,
        ref: ModelNames.USER,
      },
      size: { type: Number, default: 0 },
      isArchived: { type: Boolean, default: false },
      tags: [String],
      description: String,
    },
    settings: {
      isPublic: { type: Boolean, default: false },
      allowComments: { type: Boolean, default: true },
      versioningEnabled: { type: Boolean, default: true },
      maxVersions: { type: Number },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Define the methods on the schema
DocumentsSchema.methods.canUserEdit = function (userID: ObjectId): boolean {
  const isAuthor = this.author.userID.equals(userID);
  if (isAuthor) return true;

  const collaborator = this.collaborators.find((c: { userID: { equals: (arg0: ObjectId) => any; }; }) => c.userID.equals(userID));
  return (
    collaborator?.permission === DocumentPermission.WRITE ||
    collaborator?.permission === DocumentPermission.ADMIN
  );
};

DocumentsSchema.methods.addCollaborator = function (
  userID: ObjectId,
  permission: DocumentPermission,
  addedBy: ObjectId
): void {
  if (!this.collaborators.some((c: { userID: { equals: (arg0: ObjectId) => any; }; }) => c.userID.equals(userID))) {
    this.collaborators.push({
      userID,
      permission,
      addedAt: new Date(),
      addedBy,
    });
  }
};

DocumentsSchema.methods.updateVersion = function (
  content: any,
  updatedBy: ObjectId
): void {
  if (!this.settings.versioningEnabled) return;

  const versionNumber =
    this.versions.length > 0
      ? this.versions[this.versions.length - 1].versionNumber + 1
      : 1;

  this.versions.push({
    content,
    updatedAt: new Date(),
    updatedBy,
    versionNumber,
  });

  // Clean up old versions if maxVersions is set
  if (
    this.settings.maxVersions &&
    this.versions.length > this.settings.maxVersions
  ) {
    this.versions = this.versions.slice(-this.settings.maxVersions);
  }
};

// Indexes for better query performance
DocumentsSchema.index({ "metadata.tags": 1 });
DocumentsSchema.index({ "metadata.lastModified": -1 });
DocumentsSchema.index({ "collaborators.userID": 1 });
DocumentsSchema.index({ createdAt: -1 });

export const DocumentsModel = model<Documents>(
  ModelNames.DOCUMENTS,
  DocumentsSchema
);
