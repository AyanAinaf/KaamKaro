import React from 'react';
import { WorkerSearchResult } from '../types/worker';
import { RatingDisplay } from './RatingDisplay';
import { AvailabilityBadge } from './AvailabilityBadge';
import { SkillBadge } from './SkillBadge';
import { MapPin, Briefcase, HelpCircle, PhoneCall, ChevronRight, User } from 'lucide-react';

interface WorkerCardProps {
  result: WorkerSearchResult;
  onViewProfile: (workerId: string) => void;
  onRequestContact: (workerId: string, skillId: string) => void;
  onExplainRanking: (result: WorkerSearchResult) => void;
}

export const WorkerCard: React.FC<WorkerCardProps> = ({
  result,
  onViewProfile,
  onRequestContact,
  onExplainRanking,
}) => {
  const { worker, matchingSkill, allSkills, ranking } = result;
  const rates = matchingSkill.serviceRates;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all p-5 flex flex-col justify-between relative group">
      <div>
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3">
            {/* Avatar / Monogram */}
            <div className="w-11 h-11 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0 uppercase tracking-wider">
              {worker.fullName.split(' ').map(n => n[0]).join('')}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-slate-900 text-base leading-tight">
                  {worker.fullName}
                </h3>
                <span className="font-mono text-[11px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                  {worker.workerId}
                </span>
                <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                  · Regular
                </span>
              </div>

              {/* Location & Language */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  {worker.location} ({worker.area})
                </span>
                <span>·</span>
                <span>{worker.preferredLanguages.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Availability Badge */}
          <div className="shrink-0 text-right">
            <AvailabilityBadge
              status={matchingSkill.availabilityStatus}
              expectedAvailableAt={worker.expectedAvailableAt}
              unavailabilityReason={worker.unavailabilityReason}
            />
          </div>
        </div>

        {/* Primary Occupation & Skill Stats Box */}
        <div className="bg-slate-50/80 rounded-lg p-3 border border-slate-100 mb-3.5">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Primary Matching Skill:
              </span>
              <span className="font-bold text-slate-900 text-sm">
                {matchingSkill.occupation}
              </span>
              <span className="text-xs text-slate-500">
                ({matchingSkill.experienceYears} yrs exp)
              </span>
            </div>

            {/* "Why this worker?" Trigger */}
            <button
              onClick={() => onExplainRanking(result)}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-orange-700 hover:text-orange-900 bg-orange-50 hover:bg-orange-100/80 px-2 py-0.5 rounded transition-colors"
              title="View algorithmic ranking explanation"
            >
              <HelpCircle className="w-3 h-3" />
              <span>Score: <strong className="font-mono">{ranking.totalScore}</strong></span>
            </button>
          </div>

          {/* Rating & Job Count */}
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
            <RatingDisplay
              rating={matchingSkill.averageRating}
              totalRatings={matchingSkill.totalRatings}
              completedJobs={matchingSkill.completedJobs}
              size="md"
            />

            <div className="text-xs text-slate-600 font-medium">
              <span className="font-semibold text-slate-900 font-mono tabular-nums">
                {matchingSkill.completedJobs}
              </span> {matchingSkill.occupation.toLowerCase()} jobs done
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1.5">
            Skill Tags
          </div>
          <div className="flex flex-wrap gap-1.5">
            {matchingSkill.skillTags.map(tag => {
              const isMatched = ranking.matchedTags.some(
                mt => mt.toLowerCase() === tag.toLowerCase()
              );
              return <SkillBadge key={tag} label={tag} isMatched={isMatched} size="sm" />;
            })}
          </div>
        </div>

        {/* Multiple skills registered note */}
        {allSkills.length > 1 && (
          <div className="text-[11px] text-slate-500 mb-3 flex items-center gap-1.5">
            <Briefcase className="w-3 h-3 text-slate-400 shrink-0" />
            <span>Also skilled in:</span>
            <span className="font-medium text-slate-700">
              {allSkills
                .filter(s => s.skillId !== matchingSkill.skillId)
                .map(s => `${s.occupation} (${s.averageRating > 0 ? `${s.averageRating}★` : 'New'})`)
                .join(', ')}
            </span>
          </div>
        )}
      </div>

      {/* Card Footer: Rates & Actions */}
      <div className="pt-3 border-t border-slate-100 mt-2">
        <div className="flex items-center justify-between gap-3 mb-3">
          {/* Rate Display */}
          <div>
            <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              Service Rates
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              {rates.daily ? (
                <div className="font-bold text-slate-900 text-sm font-mono tabular-nums">
                  ₹{rates.daily.toLocaleString('en-IN')}<span className="text-xs font-normal text-slate-500 font-sans">/day</span>
                </div>
              ) : null}
              {rates.hourly ? (
                <div className="text-xs text-slate-600 font-mono tabular-nums">
                  ₹{rates.hourly}<span className="text-[10px] font-sans">/hr</span>
                </div>
              ) : null}
              {rates.weekly && !rates.hourly ? (
                <div className="text-xs text-slate-600 font-mono tabular-nums">
                  ₹{rates.weekly.toLocaleString('en-IN')}<span className="text-[10px] font-sans">/wk</span>
                </div>
              ) : null}
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-slate-400">Agent Managed</span>
            <div className="text-xs font-medium text-slate-600 font-mono">
              {worker.agentId}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onViewProfile(worker.workerId)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <User className="w-3.5 h-3.5" />
            <span>View Profile</span>
          </button>

          <button
            onClick={() => onRequestContact(worker.workerId, matchingSkill.skillId)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Request Contact</span>
          </button>
        </div>
      </div>
    </div>
  );
};
