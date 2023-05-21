import http from "@/http-common";

class searchDataService {
  async searchRequest(
    startDate,
    endDate,
    quantity,
    inn,
    maxFullness,
    inBusinessNews,
    onlyMainRole,
    tonality,
    onlyWithRiskFactors,
    excludeTechNews,
    excludeAnnouncements,
    excludeDigests
  ) {
    const response = await http.post("/api/v1/objectsearch/histograms", {
      issueDateInterval: {
        startDate: startDate,
        endDate: endDate,
      },
      searchContext: {
        targetSearchEntitiesContext: {
          targetSearchEntities: [
            {
              type: "company",
              sparkId: null,
              entityId: null,
              inn: inn,
              maxFullness: maxFullness,
              inBusinessNews: inBusinessNews,
            },
          ],
          onlyMainRole: onlyMainRole,
          tonality: tonality,
          onlyWithRiskFactors: onlyWithRiskFactors,
          riskFactors: {
            and: [],
            or: [],
            not: [],
          },
          themes: {
            and: [],
            or: [],
            not: [],
          },
        },
        themesFilter: {
          and: [],
          or: [],
          not: [],
        },
      },
      searchArea: {
        includedSources: [],
        excludedSources: [],
        includedSourceGroups: [],
        excludedSourceGroups: [],
      },
      attributeFilters: {
        excludeTechNews: excludeTechNews,
        excludeAnnouncements: excludeAnnouncements,
        excludeDigests: excludeDigests,
      },
      similarMode: "duplicates",
      limit: quantity,
      sortType: "sourceInfluence",
      sortDirectionType: "desc",
      intervalType: "month",
      histogramTypes: ["totalDocuments", "riskFactors"],
    });
    return response;
  }

  async searchRequestList(
    startDate,
    endDate,
    quantity,
    inn,
    maxFullness,
    inBusinessNews,
    onlyMainRole,
    tonality,
    onlyWithRiskFactors,
    excludeTechNews,
    excludeAnnouncements,
    excludeDigests
  ) {
    const response = await http.post("/api/v1/objectsearch", {
      issueDateInterval: {
        startDate: startDate,
        endDate: endDate,
      },
      searchContext: {
        targetSearchEntitiesContext: {
          targetSearchEntities: [
            {
              type: "company",
              sparkId: null,
              entityId: null,
              inn: inn,
              maxFullness: maxFullness,
              inBusinessNews: inBusinessNews,
            },
          ],
          onlyMainRole: onlyMainRole,
          tonality: tonality,
          onlyWithRiskFactors: onlyWithRiskFactors,
          riskFactors: {
            and: [],
            or: [],
            not: [],
          },
          themes: {
            and: [],
            or: [],
            not: [],
          },
        },
        themesFilter: {
          and: [],
          or: [],
          not: [],
        },
      },
      searchArea: {
        includedSources: [],
        excludedSources: [],
        includedSourceGroups: [],
        excludedSourceGroups: [],
      },
      attributeFilters: {
        excludeTechNews: excludeTechNews,
        excludeAnnouncements: excludeAnnouncements,
        excludeDigests: excludeDigests,
      },
      similarMode: "duplicates",
      limit: quantity,
      sortType: "sourceInfluence",
      sortDirectionType: "desc",
      intervalType: "month",
      histogramTypes: ["totalDocuments", "riskFactors"],
    });
    return response;
  }

  async getDocuments(ids) {
    const response = await http.post("/api/v1/documents", {ids: ids});

    return response
  }
}

export default new searchDataService();
